import { Navbar } from '@big-whale-labs/ui-kit'
import BlockchainList from 'components/BlockchainList'
import Dots from 'icons/Dots'
import HowItWorks from 'components/HowItWorks'
import Logo from 'icons/Logo'
import OpenEye from 'icons/OpenEye'
import Root from 'components/Root'
import SealEye from 'icons/SealEye'
import SealGrid from 'icons/SealGrid'

export default function () {
  return (
    <Root>
      <Navbar
        logo={<Logo />}
        account={undefined}
        needNetworkChange={false}
        logoText="SealCaster"
        noWalletText={'Connect burner wallet'}
      />
      <Logo />
      <SealGrid />
      <SealEye />
      <OpenEye />
      <Dots />
      <HowItWorks />
      <BlockchainList />
    </Root>
  )
}
