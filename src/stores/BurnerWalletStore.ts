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
import httpProvider from 'helpers/providers/httpProvider'
import relayProvider from 'helpers/providers/relayProvider'
import walletStore from 'stores/WalletStore'

class BurnerWalletStore extends PersistableStore {
  privateKey?: string
  proof?: ProofResult

  async generateBurnerWallet(username: string, address: string) {
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

    const wallet = this.privateKey
      ? new Wallet(this.privateKey)
      : Wallet.createRandom()

    if (!this.privateKey) this.privateKey = wallet.privateKey
    if (await hasFarcasterBadge(wallet.address)) {
      console.log('has', wallet.address)
      return
    }

    const gsnProvider = await relayProvider()
    gsnProvider.addAccount(wallet.privateKey)

    const etherProvider = new Web3Provider(
      gsnProvider as unknown as ExternalProvider
    )

    await createFarcasterBadge(
      etherProvider.getSigner(wallet.address),
      this.proof
    )
  }
}

export default proxy(new BurnerWalletStore()).makePersistent(
  env.VITE_ENCRYPT_KEY
)
