import { StatusText } from 'components/ui/Text'
import { useSnapshot } from 'valtio'
import TimeStore from 'stores/TimeStore'
import formatDate from 'helpers/formatDate'

export default function ({ timestamp }: { timestamp: number }) {
  const { current } = useSnapshot(TimeStore)
  const formatted = formatDate(timestamp, current)

  return (
    <StatusText primary textRight>
      {formatted}
    </StatusText>
  )
}
