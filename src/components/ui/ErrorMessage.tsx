import { ErrorText } from 'components/ui/Text'
import { useState } from 'preact/hooks'
import { whitespace } from 'classnames/tailwind'
import classNamesToString from 'helpers/classNamesToString'

const truncateClass = (truncate?: boolean) =>
  classNamesToString(
    whitespace('whitespace-normal'),
    truncate ? 'line-clamp-2' : undefined
  )

export default function ({
  text,
  truncated,
}: {
  text: string
  truncated?: boolean
}) {
  const [isErrorOpen, setOpenError] = useState(false)

  if (!truncated)
    return (
      <ErrorText visible={!!text} withExclamation>
        {text}
      </ErrorText>
    )

  return (
    <button onClick={() => setOpenError(!isErrorOpen)}>
      <ErrorText visible={!!text} withExclamation>
        <span className={truncateClass(!isErrorOpen)}>{text}</span>
      </ErrorText>
    </button>
  )
}
