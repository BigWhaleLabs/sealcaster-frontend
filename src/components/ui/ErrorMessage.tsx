import { ErrorText } from 'components/ui/Text'

export default function ({
  text,
  centered,
  small,
  withExclamation,
}: {
  text: string
  centered?: boolean
  small?: boolean
  withExclamation?: boolean
}) {
  const isVisible = !!text

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
