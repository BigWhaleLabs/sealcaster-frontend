import { PersistableStore } from '@big-whale-labs/stores'
import { Wallet } from 'ethers'
import {
  getEddsaPublicKey,
  requestAddressOwnershipAttestation,
  requestFarcasterAttestation,
} from 'helpers/attestor'
import { proxy } from 'valtio'
import buildFarcasterProof from 'helpers/buildFarcasterProof'
import createFarcasterBadge from 'helpers/createFarcasterBadge'
import defaultProvider from 'helpers/providers/defaultProvider'
import env from 'helpers/env'
import getNullifierMessage from 'helpers/getNullifierMessage'
import walletStore from 'stores/WalletStore'

class BurnerWalletStore extends PersistableStore {
  wallet?: Wallet

  async generateBurnerWallet(username: string, address: string) {
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
    const result = await buildFarcasterProof(
      eddsaPublicKey,
      ownershipSignature,
      farcasterSignature
    )

    this.wallet = Wallet.createRandom().connect(defaultProvider)
    if (this.wallet) await createFarcasterBadge(this.wallet, result)
  }
}

export default proxy(new BurnerWalletStore()).makePersistent(
  env.VITE_ENCRYPT_KEY
)
