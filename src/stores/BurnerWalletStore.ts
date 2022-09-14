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
    if (!this.privateKey && !walletStore.isBurnedWallet) return
    if (this.privateKey) return (await this.privateSigner()).signer
    return (await walletStore.getProvider()).getSigner(0)
  }

  async privateSigner() {
    const wallet = this.privateKey
      ? new Wallet(this.privateKey)
      : Wallet.createRandom()

    const gsnProvider = await relayProvider()
    gsnProvider.addAccount(wallet.privateKey)

    const etherProvider = new Web3Provider(
      gsnProvider as unknown as ExternalProvider
    )

    return {
      signer: etherProvider.getSigner(wallet.address),
      wallet,
    }
  }

  async generateBurnerWallet(username: string, address: string) {
    const { signer, wallet } = await this.privateSigner()

    if (await hasFarcasterBadge(wallet.address)) return

    if (!this.proof) {
      const farcasterSignature = await requestFarcasterAttestation(
        username,
        address
      )
      const eddsaPublicKey = await getEddsaPublicKey()
      const nullifierMessage = getNullifierMessage()
      const nullifierSignature = await walletStore.signMessage(nullifierMessage)
      const ownershipSignature = await requestAddressOwnershipAttestation(
        nullifierSignature,
        nullifierMessage
      )
      this.proof = await buildFarcasterProof(
        eddsaPublicKey,
        ownershipSignature,
        farcasterSignature
      )
    }

    try {
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
