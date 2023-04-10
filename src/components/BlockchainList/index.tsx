import { AccentText, BodyText } from 'components/ui/Text'
import OpenEye from 'icons/OpenEye'
import PostsList from 'components/BlockchainList/PostsList'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  width,
} from 'classnames/tailwind'

const blockchainListWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-8'),
  width('w-full')
)
const listHeader = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-1')
)
const listTitleWithIcon = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  gap('gap-x-2')
)

export default function () {
  return (
    <div className={blockchainListWrapper}>
      <div className={listHeader}>
        <div className={listTitleWithIcon}>
          <OpenEye />
          <BodyText>Recent Casts</BodyText>
        </div>
        <AccentText primary small color="text-primary-semi-dimmed">
          These casts are unfiltered blockchain data. They are not curated or
          censored.
        </AccentText>
      </div>

      <PostsList />
    </div>
  )
}
