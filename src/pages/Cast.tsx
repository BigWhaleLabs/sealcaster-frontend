import { PostStatus } from 'models/PostStatus'
import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { displayFrom } from 'helpers/visibilityClassnames'
import { handleError } from '@big-whale-labs/frontend-utils'
import { useState } from 'preact/hooks'
import BlockchainList from 'components/BlockchainList'
import Button from 'components/ui/Button'
import CastHeader from 'components/Cast/CastHeader'
import PostIdsStatuses from 'stores/PostIdsStatuses'
import PostProcessing from 'components/ProcessingCard'
import PostStore from 'stores/PostStore'
import TextArea from 'components/ui/TextArea'
import TextareaInfo from 'components/Cast/TextareaInfo'
import classnames, {
  display,
  flexDirection,
  gap,
  margin,
  space,
} from 'classnames/tailwind'
import useAccount from 'hooks/useAccount'

const processingCardWrapper = classnames(
  flexDirection('flex-col'),
  display('flex'),
  gap('gap-y-6', 'sm:gap-y-12')
)

export default function () {
  const { account } = useAccount()
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')

  const maxLength = 280

  async function createPost() {
    try {
      if (!account) return

      setIsLoading(true)
      const result = await PostStore.createPost(text)

      const posts = await PostStore.posts
      const numberOfPosts = await PostStore.postsAmount
      PostStore.postsAmount = Promise.resolve(numberOfPosts + result.length)
      for (const { id, post, derivativeAddress, sender, timestamp } of result) {
        PostStore.posts = Promise.resolve([
          {
            id,
            post,
            derivativeAddress,
            sender,
            timestamp,
          } as PostStructOutput,
          ...posts,
        ])

        PostIdsStatuses.lastUserPost = {
          [account]: {
            blockchainId: id.toNumber(),
            status: PostStatus.pending,
          },
          ...PostIdsStatuses.lastUserPost,
        }
        PostIdsStatuses.statuses[id.toNumber()] = Promise.resolve({
          status: PostStatus.pending,
        })
      }
      setText('')
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={processingCardWrapper}>
      <PostProcessing />
      <div className={space('space-y-6')}>
        <CastHeader />
        <div className={space('md:space-y-2', 'space-y-4')}>
          <TextArea
            text={text}
            disabled={isLoading}
            placeholder="Write something here..."
            onTextChange={setText}
            maxLength={maxLength}
          />
          <TextareaInfo />
        </div>
        <div className={displayFrom('md')}>
          <Button
            disabled={!text}
            loading={isLoading}
            type="primary"
            onClick={createPost}
          >
            Cast
          </Button>
        </div>
      </div>
      <div className={margin('mt-24')}>
        <BlockchainList />
      </div>
    </div>
  )
}
