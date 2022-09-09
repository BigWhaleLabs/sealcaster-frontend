import BlockchainList from 'components/BlockchainList'
import Dots from 'icons/Dots'
import HowItWorks from 'components/HowItWorks'
import Logo from 'icons/Logo'
import OpenEye from 'icons/OpenEye'
import SealEye from 'icons/SealEye'
import SealGrid from 'icons/SealGrid'

export default function () {
  return (
    <>
      <Logo />
      <SealGrid />
      <SealEye />
      <OpenEye />
      <Dots />
      <HowItWorks />
      <BlockchainList />
    </>
  )
}
