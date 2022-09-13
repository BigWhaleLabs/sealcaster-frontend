import { BodyText, HeaderText } from 'components/ui/Text'
import Loading from 'components/ui/Loading'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  margin,
  maxWidth,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-6'),
  alignItems('items-center')
)
const textWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)
const descriptionText = classnames(
  maxWidth('max-w-processing-content'),
  margin('mx-2', 'sm:mx-0')
)

export default function () {
  return (
    <div className={wrapper}>
      <div className={textWrapper}>
        <HeaderText small center>
          Your cast is processing
        </HeaderText>
        <div className={descriptionText}>
          <BodyText center>
            This may take a few minutes or up to 24 hours to cast to Farcaster.
            However, you can always view your cast down below.
          </BodyText>
        </div>
      </div>

      <Loading />
    </div>
  )
}
