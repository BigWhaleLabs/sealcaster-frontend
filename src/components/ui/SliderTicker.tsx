import { AccentText } from 'components/ui/Text'
import classnames, {
  animation,
  backgroundColor,
  display,
  gap,
  letterSpacing,
  padding,
  textTransform,
  whitespace,
  willChange,
} from 'classnames/tailwind'

const ticker = classnames(
  display('flex'),
  gap('gap-x-2'),
  whitespace('whitespace-nowrap'),
  textTransform('uppercase'),
  backgroundColor('bg-primary-dark-transparent'),
  padding('py-2'),
  letterSpacing('tracking-extra-wide')
)
const oneLine = classnames(
  animation('animate-ticker'),
  willChange('will-change-transform')
)

export default function ({ sentences }: { sentences: string[] }) {
  const text = sentences
    .map((sentence) => `•• Cast anonymously to Farcaster •• ${sentence} `)
    .join('')

  const texts = Array(3).fill(text)

  return (
    <div className={ticker}>
      {texts.map((text) => (
        <span className={oneLine}>
          <AccentText color="text-tertiary" bold extraSmall>
            {text}
          </AccentText>
        </span>
      ))}
    </div>
  )
}
