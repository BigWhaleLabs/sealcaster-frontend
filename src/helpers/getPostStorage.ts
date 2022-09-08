import { SCPostStorage__factory } from '@big-whale-labs/seal-cred-posts-contract'
import defaultProvider from 'helpers/providers/defaultProvider'
import env from 'helpers/env'

export default function () {
  return SCPostStorage__factory.connect(
    env.VITE_SC_FARCASTER_POSTS_CONTRACT_ADDRESS,
    defaultProvider
  )
}
