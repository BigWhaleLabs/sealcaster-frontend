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
  centered,
  truncated,
  small,
  withExclamation,
}: {
  text: string
  centered?: boolean
  truncated?: boolean
  small?: boolean
  withExclamation?: boolean
}) {
  const [isErrorClosed, setOpenError] = useState(true)
  const isVisible = !!text

  if (truncated)
    return (
      <button onClick={() => setOpenError(!isErrorClosed)}>
        <ErrorText
          centered={centered}
          small={small}
          visible={isVisible}
          withExclamation={withExclamation}
        >
          <span className={truncateClass(isErrorClosed)}>{text}</span>
        </ErrorText>
      </button>
    )

  return (
    <ErrorText
      centered={centered}
      small={small}
      visible={isVisible}
      withExclamation={withExclamation}
    >
      {text}
    </ErrorText>
  )
}
