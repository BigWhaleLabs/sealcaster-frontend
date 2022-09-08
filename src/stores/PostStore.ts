import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { proxy } from 'valtio'
import getMorePosts from 'helpers/getMorePosts'
import getPostStorage from 'helpers/getPostStorage'
import safeGetPostsAmountFromContract from 'helpers/safeGetPostsAmountFromContract'

interface PostStoreType {
  limit: number
  posts: Promise<PostStructOutput[]>
  postsAmount: Promise<number>
  selectedToken?: string
}

const limit = 100

const PostStore = proxy<PostStoreType>({
  limit,
  postsAmount: safeGetPostsAmountFromContract(getPostStorage()),
  posts: getMorePosts({
    contract: getPostStorage(),
    limitAmount: limit,
  }),
  selectedToken: undefined,
})

export default PostStore
