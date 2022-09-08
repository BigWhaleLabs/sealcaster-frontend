import { AccentText, BodyText } from 'components/Text'
import Eye from 'components/Icons/Eye'
import PostsList from 'components/BlockchainList/PostsList'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
} from 'classnames/tailwind'
// import { useSnapshot } from 'valtio'
// import AgeWarning from 'components/BlockchainList/AgeWarning'
// import FilterBySelectedToken from 'components/BlockchainList/FilterBySelectedToken'
// import HintCard from 'components/HintCard'
// import NotificationStore from 'stores/NotificationStore'
// import PostsList from 'components/BlockchainList/PostsList'
// import PreviousTweetsLayout from 'components/PostsLayout'
// import classNamesToString from 'helpers/classNamesToString'

const blockchainListWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-8')
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
          <Eye />
          <BodyText>Recent Casts</BodyText>
        </div>
        <AccentText small primary color="text-primary-semi-dimmed">
          These casts are unfiltered blockchain data. They are not curated or
          censored.
        </AccentText>
      </div>

      <PostsList />
    </div>
  )
}
