import classnames, {
  flexShrink,
  stroke,
  strokeWidth,
} from 'classnames/tailwind'

const strokes = classnames(
  strokeWidth('stroke-1'),
  stroke('stroke-formal-accent')
)

export default function () {
  return (
    <svg
      className={flexShrink('shrink-0')}
      fill="none"
      height="13"
      viewBox="0 0 13 13"
      width="13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={strokes}
        cx="6.50065"
        cy="6.50016"
        r="5.41667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <line
        className={strokes}
        stroke-linecap="round"
        stroke-linejoin="round"
        x1="6.50065"
        x2="6.50065"
        y1="3.79167"
        y2="6.5"
      />
      <line
        className={strokes}
        stroke-linecap="round"
        stroke-linejoin="round"
        x1="6.50065"
        x2="6.50065"
        y1="8.66667"
        y2="9.20833"
      />
    </svg>
  )
}
