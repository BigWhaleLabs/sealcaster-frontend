import classnames, {
  fontSize,
  textColor,
  whitespace,
} from 'classnames/tailwind'

const counterText = (error?: boolean) =>
  classnames(
    textColor({ 'text-error': error }),
    fontSize('text-sm'),
    whitespace('whitespace-nowrap')
  )

export default function ({ max, value }: { max: number; value: number }) {
  return (
    <div className={counterText(value > max)}>
      {value}/{max}
    </div>
  )
}
