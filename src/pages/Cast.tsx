import { AccentText } from 'components/ui/Text'
import { PostStatus } from 'models/PostStatus'
import { Redirect } from 'wouter'
import { displayFrom } from 'helpers/visibilityClassnames'
import { handleError, parseErrorText } from '@big-whale-labs/frontend-utils'
import { useState } from 'preact/hooks'
import BlockchainList from 'components/BlockchainList'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import Button from 'components/ui/Button'
import CastHeader from 'components/Cast/CastHeader'
import ErrorMessage from 'components/ui/ErrorMessage'
import PostIdsStatuses from 'stores/PostIdsStatuses'
import PostProcessing from 'components/ProcessingCard'
import PostStore from 'stores/PostStore'
import TextArea from 'components/ui/TextArea'
import TextareaInfo from 'components/Cast/TextareaInfo'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  margin,
  space,
} from 'classnames/tailwind'
import getErrorMessage from 'helpers/getErrorMessage'
import useBadgeAccount from 'hooks/useBadgeAccount'
import useScrollToTop from 'hooks/useScrollToTop'

const processingCardWrapper = classnames(
  flexDirection('flex-col'),
  display('flex'),
  gap('gap-y-6', 'sm:gap-y-12')
)
const buttonWithError = classnames(display('flex'), gap('gap-x-4'))

export default function () {
  const { account, isBurner, hasFarcasterBadge } = useBadgeAccount()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>()
  const [text, setText] = useState('')
  useScrollToTop()

  const maxLength = 279
  const errorMessage = error ? parseErrorText(error) : ''

  async function createPost() {
    setError(null)
    try {
      if (!account) return

      setIsLoading(true)
      if (PostIdsStatuses.lastUserPost)
        delete PostIdsStatuses.lastUserPost[account]
      const result = await PostStore.createPost(text)

      const numberOfPosts = await PostStore.postsAmount
      PostStore.postsAmount = Promise.resolve(numberOfPosts + result.length)
      for (const { id } of result) {
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
      if (!BurnerWalletStore.used) BurnerWalletStore.used = true
      setText('')
    } catch (error) {
      setError(getErrorMessage(error))
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
                error={errorMessage}
              />
            </div>
            <div
              className={classnames(
                displayFrom('md'),
                display('flex'),
                flexDirection('flex-col'),
                alignItems('items-start'),
                gap('gap-y-2')
              )}
            >
              <div className={buttonWithError}>
                <Button
                  disabled={!text}
                  loading={isLoading}
                  type="primary"
                  onClick={createPost}
                  heightFit
                >
                  Cast
                </Button>
                {!!errorMessage && <ErrorMessage small text={errorMessage} />}
              </div>
              {isLoading && (
                <AccentText extraSmall color="text-accent">
                  Hang on, this often takes a minute or two...
                </AccentText>
              )}
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
