import { WalletStore as BaseWalletStore } from '@upacyxou/stores'
import { proxy } from 'valtio'
import env from 'helpers/env'
import hasFarcasterBadge from 'helpers/hasFarcasterBadge'

class WalletStore extends BaseWalletStore {
  hasFarcasterBadge?: Promise<boolean>

  constructor(...args: ConstructorParameters<typeof BaseWalletStore>) {
    super(...args)
  }

  changeAccount(account?: string) {
    super.changeAccount(account)
    this.hasFarcasterBadge = account
      ? hasFarcasterBadge(account)
      : Promise.resolve(false)
  }
}

const walletStore = proxy(
  new WalletStore(
    env.VITE_ETH_RPC,
    env.VITE_ETH_NETWORK,
    env.VITE_APP_NAME,
    5,
    ['hasFarcasterBadge']
  )
).makePersistent(env.VITE_ENCRYPT_KEY)

if (walletStore.cachedProvider) void walletStore.connect()

export default walletStore
