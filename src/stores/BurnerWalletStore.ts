import { PersistableStore } from '@big-whale-labs/stores'
import { Wallet, ethers } from 'ethers'
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
  privateKey?: string

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

    const wallet = this.privateKey
      ? new Wallet(this.privateKey)
      : Wallet.createRandom()

    console.log('address', wallet.address)

    if (!this.privateKey) {
      this.privateKey = wallet.privateKey
    }

    if (wallet) {
      // TODO: get farcaster derivative address inside ledger
      const abi = ['function balanceOf(address owner) view returns (uint256)']
      const contract = new ethers.Contract(
        '0xbc9d096f78d737fa969a7385b011f84dbb909291',
        abi,
        defaultProvider
      )
      const balance = await contract.balanceOf(wallet.address)

      if (!balance.eq(0)) return

      // TODO: connect with relay provider!
      await createFarcasterBadge(wallet, result)
    }
  }
}

export default proxy(new BurnerWalletStore()).makePersistent(
  env.VITE_ENCRYPT_KEY
)
