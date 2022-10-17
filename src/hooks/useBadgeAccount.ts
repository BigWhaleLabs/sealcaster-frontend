import { Wallet } from 'ethers'
import { useSnapshot } from 'valtio'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import walletStore from 'stores/WalletStore'

export default function () {
  const { account } = useSnapshot(walletStore)
  const { privateKey, generateMode } = useSnapshot(BurnerWalletStore)

  if (generateMode || privateKey)
    return privateKey ? new Wallet(privateKey).address : undefined

  return account
}
