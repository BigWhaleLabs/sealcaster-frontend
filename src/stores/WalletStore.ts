import { ErrorList, handleError } from '@big-whale-labs/frontend-utils'
import { ExternalProvider, Web3Provider } from '@ethersproject/providers'
import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import { serializeError } from 'eth-rpc-errors'
import chainForWallet from 'helpers/chainForWallet'
import env from 'helpers/env'
import hasFarcasterBadge from 'helpers/hasFarcasterBadge'
import networkChainIdToName from 'models/networkChainIdToName'
import relayProvider from 'helpers/providers/relayProvider'
import web3Modal from 'helpers/web3Modal'

let provider: Web3Provider

class WalletStore extends PersistableStore {
  account?: string
  hasFarcasterBadge?: Promise<boolean>
  acceptedNotBurner = false
  walletLoading = false

  changeAccount(account?: string) {
    this.account = account
    this.hasFarcasterBadge = account
      ? hasFarcasterBadge(account)
      : Promise.resolve(false)
    this.acceptedNotBurner = false
  }

  replacer = (key: string, value: unknown) => {
    const disallowList = [
      'account',
      'cachedProvider',
      'provider',
      'walletLoading',
      'hasFarcasterBadge',
    ]
    return disallowList.includes(key) ? undefined : value
  }

  get cachedProvider() {
    return web3Modal.cachedProvider
  }

  async connect(clearCachedProvider = false, checkNetwork = false) {
    this.walletLoading = true
    try {
      if (clearCachedProvider) web3Modal.clearCachedProvider()

      const instance = await web3Modal.connect()
      provider = new Web3Provider(instance)
      if (
        checkNetwork &&
        !(await this.checkNetwork()) &&
        !(await this.requestChangeNetwork())
      ) {
        console.log('checkNetwork')
        throw new Error(
          ErrorList.wrongNetwork(
            await walletStore.currentNetwork(),
            env.VITE_ETH_NETWORK
          )
        )
      }
      const account = (await provider.listAccounts())[0]
      this.changeAccount(account)
      this.subscribeProvider(instance)
      return account
    } catch (error) {
      if (error === 'Modal closed by user') return
      handleError(error)
      this.clearData()
    } finally {
      this.walletLoading = false
    }
  }

  async currentNetwork() {
    if (!provider) throw new Error(ErrorList.noProvider)
    return (await provider.getNetwork()).name
  }

  async checkNetwork() {
    if (!provider) throw new Error(ErrorList.noProvider)
    const userNetwork = await this.currentNetwork()
    const network = env.VITE_ETH_NETWORK

    return userNetwork === network
  }

  private async requestChangeNetwork() {
    if (!provider) throw new Error(ErrorList.noProvider)
    const index = Object.values(networkChainIdToName).findIndex(
      (name) => name === env.VITE_ETH_NETWORK
    )

    const chainId = Object.keys(networkChainIdToName)[index]

    try {
      await provider.send('wallet_switchEthereumChain', [{ chainId }])
    } catch (error) {
      const code = serializeError(error).code
      if (code !== 4902) return false

      await provider.send('wallet_addEthereumChain', [chainForWallet()])
    }
    return true
  }

  private async handleAccountChanged() {
    if (!provider) return

    this.walletLoading = true
    const accounts = await provider.listAccounts()
    const account = accounts[0]
    this.changeAccount(account)
    this.walletLoading = false
  }

  signMessage(message: string) {
    if (!provider) throw new Error('No provider')

    const signer = provider.getSigner()
    return signer.signMessage(message)
  }

  get provider() {
    return provider
  }

  async getSigner() {
    if (!provider) throw new Error(ErrorList.noProvider)

    const gsnProvider = await relayProvider(provider)

    return new Web3Provider(
      gsnProvider as unknown as ExternalProvider
    ).getSigner(0)
  }

  private subscribeProvider(provider: Web3Provider) {
    if (!provider.on) return

    provider.on('error', (error: Error) => {
      handleError(error)
    })

    provider.on('accountsChanged', (accounts: string[]) => {
      if (!accounts.length) this.clearData()

      this.changeAccount()
      void this.handleAccountChanged()
    })
    provider.on('disconnect', (error: unknown) => {
      if (provider) provider.removeAllListeners()
      handleError(error)
      this.clearData()
    })
    provider.on('chainChanged', async () => {
      this.changeAccount()
      await this.connect()
    })
  }

  private clearData() {
    web3Modal.clearCachedProvider()
    this.changeAccount()
  }

  exit() {
    this.clearData()
  }
}

const walletStore = proxy(new WalletStore()).makePersistent(
  env.VITE_ENCRYPT_KEY
)

if (walletStore.cachedProvider) void walletStore.connect()

export default walletStore
