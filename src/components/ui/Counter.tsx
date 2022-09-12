import classnames, {
  fontSize,
  textColor,
  whitespace,
} from 'classnames/tailwind'

const counterText = (error?: boolean) =>
  classnames(
    textColor(error ? 'text-error' : 'text-formal-accent'),
    fontSize('text-xs'),
    whitespace('whitespace-nowrap')
  )

export default function ({ max, value }: { max: number; value: number }) {
  return (
    <div className={counterText(value > max)}>
      {value} / {max}
    </div>
  )
}
