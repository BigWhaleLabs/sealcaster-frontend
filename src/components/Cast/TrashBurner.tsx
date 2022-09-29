import { TrashButtonText } from 'components/ui/Text'
import Button from 'components/ui/Button'
import classnames, { alignSelf, margin } from 'classnames/tailwind'

const buttonWrapper = classnames(
  alignSelf('self-center'),
  margin('mt-2', 'md:mt-0')
)

export default function ({ onClick }: { onClick: () => void }) {
  return (
    <span className={buttonWrapper}>
      <Button type="tertiary" onClick={onClick}>
        <TrashButtonText>Trash wallet</TrashButtonText>
      </Button>
    </span>
  )
}
