import { Navbar } from '@big-whale-labs/ui-kit'
import Dots from 'icons/Dots'
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
        getENSName={(address) => undefined}
        logoText="SealCaster"
      />
      <Logo />
      <SealGrid />
      <SealEye />
      <OpenEye />
      <Dots />
    </Root>
  )
}
