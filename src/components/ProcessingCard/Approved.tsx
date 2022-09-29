import { HeaderText } from 'components/ui/Text'
import LinkButton from 'components/ProcessingCard/LinkButton'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-6', 'sm:gap-y-2'),
  alignItems('items-center')
)
const textWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)

export default function ({ id }: { id?: number }) {
  return (
    <div className={wrapper}>
      <div className={textWrapper}>
        <HeaderText center size="small">
          Cast successful
        </HeaderText>
      </div>

      {id && <LinkButton url={`/cast#id=${id}`} />}
    </div>
  )
}
