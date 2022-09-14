import { Eip1193Bridge } from '@ethersproject/experimental'
import { RelayProvider } from '@opengsn/provider'
import { Web3Provider } from '@ethersproject/providers'
import { WrapBridge } from '@opengsn/provider/dist/WrapContract'
import env from 'helpers/env'
import httpProvider from 'helpers/providers/httpProvider'

export default function relayProvider(provider?: Web3Provider) {
  return RelayProvider.newProvider({
    provider: provider
      ? new WrapBridge(new Eip1193Bridge(provider.getSigner(0), provider))
      : httpProvider,
    config: {
      minMaxPriorityFeePerGas: 11000000000,
      paymasterAddress: env.VITE_GSN_PAYMASTER_CONTRACT_ADDRESS,
      preferredRelays: [env.VITE_GSN_SC_RELAY],
      blacklistedRelays: ['https://goerli.v3.opengsn.org/v3'],
    },
  }).init()
}
