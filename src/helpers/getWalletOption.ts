import Option from 'components/Dropdown/Option'
import WalletOptions from 'models/WalletOptions'

export default function (isBurner?: boolean): Option[] {
  return Object.keys(WalletOptions)
    .map((name: string) => {
      if (name === 'wallet') {
        return isBurner
          ? { label: WalletOptions[name], value: name }
          : undefined
      }
      return { label: WalletOptions[name], value: name }
    })
    .filter((val) => val !== undefined) as Option[]
}
