import { ExternalProvider, Web3Provider } from '@ethersproject/providers'
import { PersistableStore } from '@big-whale-labs/stores'
import { Wallet } from 'ethers'
import {
  getEddsaPublicKey,
  requestAddressOwnershipAttestation,
  requestFarcasterAttestation,
} from 'helpers/attestor'
import { proxy } from 'valtio'
import ProofResult from 'models/ProofResult'
import buildFarcasterProof from 'helpers/buildFarcasterProof'
import createFarcasterBadge from 'helpers/createFarcasterBadge'
import defaultProvider from 'helpers/providers/defaultProvider'
import env from 'helpers/env'
import getNullifierMessage from 'helpers/getNullifierMessage'
import hasFarcasterBadge from 'helpers/hasFarcasterBadge'
import relayProvider from 'helpers/providers/relayProvider'
import walletStore from 'stores/WalletStore'

class BurnerWalletStore extends PersistableStore {
  privateKey?: string
  proof?: ProofResult

  burn() {
    this.privateKey = undefined
    void walletStore.exit()
  }

  async getSigner() {
    if (!this.privateKey) return
    return (await this.privateSigner()).signer
  }

  async privateSigner() {
    const wallet = this.privateKey
      ? new Wallet(this.privateKey)
      : Wallet.createRandom()

    const gsnProvider = await relayProvider(defaultProvider)
    gsnProvider.addAccount(wallet.privateKey)

    const etherProvider = new Web3Provider(
      gsnProvider as unknown as ExternalProvider
    )

    return {
      signer: etherProvider.getSigner(wallet.address),
      wallet,
    }
  }

  async generateBurnerWallet(
    username: string,
    address: string,
    onChange: (status: string) => void
  ) {
    const { signer, wallet } = await this.privateSigner()

    if (await hasFarcasterBadge(wallet.address)) return

    if (!this.proof) {
      onChange('Checking farcaster account...')
      const farcasterSignature = await requestFarcasterAttestation(
        username,
        address
      )
      const eddsaPublicKey = await getEddsaPublicKey()
      const nullifierMessage = getNullifierMessage()
      onChange('Requires signiture...')
      const nullifierSignature = await walletStore.signMessage(nullifierMessage)
      onChange('Obtaining token from attestor...')
      const ownershipSignature = await requestAddressOwnershipAttestation(
        nullifierSignature,
        nullifierMessage
      )
      onChange('Generating Farcaster zk proof')
      this.proof = await buildFarcasterProof(
        eddsaPublicKey,
        ownershipSignature,
        farcasterSignature
      )
    }

    try {
      onChange('Applying Farcaster zk badge...')
      await createFarcasterBadge(signer, this.proof)
      if (!this.privateKey) this.privateKey = wallet.privateKey
    } finally {
      this.proof = undefined
    }
  }
}

export default proxy(new BurnerWalletStore()).makePersistent(
  env.VITE_ENCRYPT_KEY
)
