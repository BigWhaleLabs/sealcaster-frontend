import { Wallet } from 'ethers'
import { useSnapshot } from 'valtio'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import walletStore from 'stores/WalletStore'

export default function () {
  const { account, isBurnedWallet, walletLoading } = useSnapshot(walletStore)
  const { privateKey } = useSnapshot(BurnerWalletStore)

  return {
    account: privateKey ? new Wallet(privateKey).address : account,
    isBurned: !!privateKey || isBurnedWallet,
    walletLoading,
  }
}
