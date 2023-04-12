import { SCPostStorage__factory } from '@big-whale-labs/seal-cred-posts-contract'
import defaultProvider from 'helpers/providers/defaultProvider'
import env from 'helpers/env'
import heavyProvider from 'helpers/providers/heavyProvider'

export default function (useDefault = true) {
  return SCPostStorage__factory.connect(
    env.VITE_SC_FARCASTER_POSTS_CONTRACT_ADDRESS,
    useDefault ? defaultProvider : heavyProvider
  )
}
