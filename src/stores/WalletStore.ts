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
  walletLoading = false
  needNetworkChange = false

  changeAccount(account?: string) {
    this.account = account
    this.hasFarcasterBadge = account
      ? hasFarcasterBadge(account)
      : Promise.resolve(false)
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

  async connect(clearCachedProvider = false) {
    this.walletLoading = true
    try {
      if (clearCachedProvider) web3Modal.clearCachedProvider()

      const instance = await web3Modal.connect()
      provider = new Web3Provider(instance)
      const userNetwork = (await provider.getNetwork()).name
      await this.checkNetwork(provider, userNetwork)
      if (this.needNetworkChange)
        throw new Error(
          ErrorList.wrongNetwork(userNetwork, env.VITE_ETH_NETWORK)
        )
      const account = (await provider.listAccounts())[0]
      this.changeAccount(account)
      this.subscribeProvider(instance)
    } catch (error) {
      if (error === 'Modal closed by user') return
      handleError(error)
      this.clearData()
    } finally {
      this.walletLoading = false
    }
  }

  private async checkNetwork(provider: Web3Provider, userNetwork: string) {
    const network = env.VITE_ETH_NETWORK
    if (userNetwork === network) return (this.needNetworkChange = false)

    this.needNetworkChange = true
    await this.requestChangeNetwork(provider)
  }

  private async requestChangeNetwork(provider: Web3Provider) {
    const index = Object.values(networkChainIdToName).findIndex(
      (name) => name === env.VITE_ETH_NETWORK
    )
    const chainId = Object.keys(networkChainIdToName)[index]

    try {
      await provider.send('wallet_switchEthereumChain', [{ chainId }])
      this.needNetworkChange = false
    } catch (error) {
      const code = serializeError(error).code
      if (code !== 4902) return

      await provider.send('wallet_addEthereumChain', [chainForWallet()])
      this.needNetworkChange = false
    }
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
