import { Eip1193Bridge } from '@ethersproject/experimental'
import { Provider } from '@ethersproject/providers'
import { RelayProvider } from '@opengsn/provider'
import { Signer } from 'ethers'
import { WrapBridge } from '@opengsn/provider/dist/WrapContract'
import env from 'helpers/env'

export default function relayProvider(signer: Signer, provider: Provider) {
  return RelayProvider.newProvider({
    provider: new WrapBridge(new Eip1193Bridge(signer, provider)),
    config: {
      paymasterAddress: env.VITE_GSN_PAYMASTER_CONTRACT_ADDRESS,
      preferredRelays: [env.VITE_GSN_SC_RELAY],
      blacklistedRelays: ['https://goerli.v3.opengsn.org/v3'],
    },
  }).init()
}
