import { AccentText } from 'components/ui/Text'
import Ticker from 'react-ticker'
import classnames, {
  backgroundColor,
  letterSpacing,
  padding,
  textTransform,
  whitespace,
} from 'classnames/tailwind'

const ticker = classnames(
  whitespace('whitespace-nowrap'),
  textTransform('uppercase'),
  backgroundColor('bg-primary-dark-transparent'),
  padding('py-2'),
  letterSpacing('tracking-extra-wide')
)
export default function ({ sentences }: { sentences: string[] }) {
  const text = sentences
    .map((sentence) => `•• Cast anonymously to Farcaster •• ${sentence} \u00A0`)
    .join('')

  return (
    <div className={ticker}>
      <Ticker>
        {() => (
          <AccentText color="text-tertiary" bold extraSmall>
            {text}
          </AccentText>
        )}
      </Ticker>
    </div>
  )
}
