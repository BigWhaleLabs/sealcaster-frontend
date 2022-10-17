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
  status = ''
  used = false
  generateMode = false

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

  async generateBurnerWallet(address: string) {
    this.generateMode = true
    try {
      this.status = 'Getting account data...'
      const { signer, wallet } = await this.privateSigner()

      this.status = 'Checking farcaster badge...'
      if (await hasFarcasterBadge(wallet.address)) return

      if (!this.proof) {
        this.status = 'Checking farcaster account...'
        const farcasterSignature = await requestFarcasterAttestation(address)
        const eddsaPublicKey = await getEddsaPublicKey()
        const nullifierMessage = getNullifierMessage()
        this.status = 'Requesting signature...'
        const nullifierSignature = await walletStore.signMessage(
          nullifierMessage
        )
        this.status = 'Obtaining token from attestor...'
        const ownershipSignature = await requestAddressOwnershipAttestation(
          nullifierSignature,
          nullifierMessage
        )
        this.status = 'Generating Farcaster ZK proof...'
        this.proof = await buildFarcasterProof(
          eddsaPublicKey,
          ownershipSignature,
          farcasterSignature
        )
      }

      try {
        this.status = 'Minting Farcaster ZK badge...'
        await createFarcasterBadge(signer, this.proof)
        if (!this.privateKey) {
          this.privateKey = wallet.privateKey
          this.used = false
        }
      } finally {
        this.proof = undefined
      }
    } finally {
      this.status = ''
      this.generateMode = false
    }
  }
}

export default proxy(new BurnerWalletStore()).makePersistent(
  env.VITE_ENCRYPT_KEY
)
