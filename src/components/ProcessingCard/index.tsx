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
  urlToCast,
}: {
  status: CastStatus
  urlToCast?: string
}) => {
  switch (status) {
    case CastStatus.approved:
      return <div>Approved card</div>
    case CastStatus.rejected:
      return <Rejected urlToCast={urlToCast} />
    default:
      return <Pending />
  }
}

export default function () {
  return (
    <div className={cardWrapper}>
      <CastState
        status={CastStatus.rejected}
        urlToCast="https://sealcaster.xyz/?id=123"
      />
    </div>
  )
}
