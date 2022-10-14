import { BigNumber, utils } from 'ethers'

export default function () {
  return [
    BigNumber.from(utils.randomBytes(32)).toHexString(),
    BigNumber.from(utils.randomBytes(32)).toHexString(),
  ]
}
