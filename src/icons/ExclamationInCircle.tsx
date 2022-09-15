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
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={flexShrink('shrink-0')}
    >
      <circle
        cx="6.50065"
        cy="6.50016"
        r="5.41667"
        className={strokes}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <line
        x1="6.50065"
        y1="3.79167"
        x2="6.50065"
        y2="6.5"
        className={strokes}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <line
        x1="6.50065"
        y1="8.66667"
        x2="6.50065"
        y2="9.20833"
        className={strokes}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
