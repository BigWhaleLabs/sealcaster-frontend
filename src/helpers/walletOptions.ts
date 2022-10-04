import Network from 'models/Network'
import Option from 'components/Dropdown/Option'
import getEtherscanAddressUrl from 'helpers/network/getEtherscanAddressUrl'

export default function (account: string, isBurner?: boolean): Option[] {
  const options: Option[] = [
    {
      label: 'Etherscan',
      value: getEtherscanAddressUrl(account, Network.Goerli),
    },
    {
      label: 'Disconnect',
      value: 'disconnect',
    },
  ]

  if (isBurner)
    return [
      {
        label: 'Wallet',
        value: 'wallet',
      },
      ...options,
    ]

  return options
}
