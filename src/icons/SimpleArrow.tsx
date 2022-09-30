import classnames, { stroke, strokeWidth } from 'classnames/tailwind'

const pathClassName = classnames(
  stroke('stroke-primary-light'),
  strokeWidth('stroke-4')
)

export default function ({ small }: { small?: boolean }) {
  if (small)
    return (
      <svg
        width="19"
        height="27"
        viewBox="0 0 19 27"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.3125 24.1875V2M9.3125 2L2.125 9.1875M9.3125 2L16.5 9.1875"
          className={pathClassName}
        />
      </svg>
    )
  return (
    <svg
      width="27"
      height="40"
      viewBox="0 0 27 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 37.5V2M13.5 2L2 13.5M13.5 2L25 13.5"
        className={pathClassName}
      />
    </svg>
  )
}
