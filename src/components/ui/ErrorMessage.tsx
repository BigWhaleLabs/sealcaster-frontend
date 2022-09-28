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
  withExclamation,
}: {
  text: string
  truncated?: boolean
  withExclamation?: boolean
}) {
  const [isErrorClosed, setOpenError] = useState(true)
  const isVisible = !!text

  if (truncated)
    return (
      <button onClick={() => setOpenError(!isErrorClosed)}>
        <ErrorText visible={isVisible} withExclamation={withExclamation}>
          <span className={truncateClass(isErrorClosed)}>{text}</span>
        </ErrorText>
      </button>
    )

  return (
    <ErrorText visible={isVisible} withExclamation={withExclamation}>
      {text}
    </ErrorText>
  )
}
