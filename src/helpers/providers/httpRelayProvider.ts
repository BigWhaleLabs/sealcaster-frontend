import { ETH_RPC } from '@big-whale-labs/constants'
import { RelayProvider } from '@opengsn/provider'
import HttpProvider from 'web3-providers-http'
import env from 'helpers/env'

export default function () {
  const provider = new HttpProvider(ETH_RPC)

  return RelayProvider.newProvider({
    provider,
    config: {
      minMaxPriorityFeePerGas: 11000000000,
      paymasterAddress: env.VITE_GSN_PAYMASTER_CONTRACT_ADDRESS,
      preferredRelays: [env.VITE_GSN_SC_RELAY],
      blacklistedRelays: ['https://goerli.v3.opengsn.org/v3'],
    },
  }).init()
}
