import { PostStatus } from 'models/PostStatus'
import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { Redirect } from 'wouter'
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
import useBadgeAccount from 'hooks/useBadgeAccount'

const processingCardWrapper = classnames(
  flexDirection('flex-col'),
  display('flex'),
  gap('gap-y-6', 'sm:gap-y-12')
)

export default function () {
  const { account, isBurner, hasFarcasterBadge } = useBadgeAccount()
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')

  const maxLength = 279

  async function createPost() {
    try {
      if (!account) return

      setIsLoading(true)
      if (PostIdsStatuses.lastUserPost)
        delete PostIdsStatuses.lastUserPost[account]
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

        const blockchainId = id.toNumber()
        const status = PostStatus.pending

        PostIdsStatuses.lastUserPost = {
          [account]: {
            blockchainId,
            status,
          },
          ...PostIdsStatuses.lastUserPost,
        }
        PostIdsStatuses.statuses[blockchainId] = Promise.resolve({
          status,
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
      {isBurner || hasFarcasterBadge ? (
        <>
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
              <TextareaInfo
                loading={isLoading}
                onButtonClick={createPost}
                disabled={!text}
              />
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
          <div className={margin('mt-20', 'sm:mt-14')}>
            <BlockchainList />
          </div>
        </>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  )
}
