import { LoadingText } from 'components/ui/Text'
import Loading from 'components/ui/Loading'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  height,
  margin,
  padding,
} from 'classnames/tailwind'

const loadingClass = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  gap('gap-y-6'),
  height('h-full'),
  padding('py-6')
)

export default function ({ text }: { text: string }) {
  return (
    <div className={loadingClass}>
      <LoadingText>{text}</LoadingText>
      <div className={margin('mx-auto')}>
        <Loading />
      </div>
    </div>
  )
}
