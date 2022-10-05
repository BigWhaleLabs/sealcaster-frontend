import { walletOptions } from 'models/WalletOptions'
import Option from 'components/Dropdown/Option'

export default function (isBurner?: boolean): Option[] {
  return Object.keys(walletOptions)
    .map((name: string) => {
      if (name === 'wallet') {
        return isBurner
          ? { label: walletOptions[name], value: name }
          : undefined
      }
      return { label: walletOptions[name], value: name }
    })
    .filter((val) => val !== undefined) as Option[]
}
