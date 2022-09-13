import CastStatus from 'models/CastStatus'
import Pending from 'components/ProcessingCard/Pending'
import Rejected from 'components/ProcessingCard/Rejected'
import classnames, {
  backgroundColor,
  borderRadius,
  padding,
  width,
} from 'classnames/tailwind'

const cardWrapper = classnames(
  width('w-full'),

  backgroundColor('bg-primary-background'),
  padding('py-6', 'px-4', 'sm:px-6'),
  borderRadius('rounded-2xl')
)

const CastState = ({
  status,
  castId,
}: {
  status: CastStatus
  castId?: string
}) => {
  switch (status) {
    case CastStatus.approved:
      return <div>Approved card</div>
    case CastStatus.rejected:
      return <Rejected id={castId} />
    default:
      return <Pending />
  }
}

export default function () {
  return (
    <div className={cardWrapper}>
      <CastState status={CastStatus.rejected} castId="123" />
    </div>
  )
}
