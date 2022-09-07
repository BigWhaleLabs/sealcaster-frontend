import classnames, { stroke } from 'classnames/tailwind'

const strokeLine = classnames(stroke('stroke-accent'))

export default function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="13"
      viewBox="0 0 19 13"
      fill="none"
    >
      <path
        d="M17.348 5.54566C17.7795 6.11815 17.7795 6.88185 17.348 7.45434C16.161 9.02918 13.4044 12 9.5 12C5.59559 12 2.83899 9.02918 1.652 7.45434C1.22051 6.88186 1.22051 6.11815 1.652 5.54566C2.83899 3.97082 5.59559 1 9.5 1C13.4044 1 16.161 3.97082 17.348 5.54566Z"
        className={strokeLine}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <circle
        cx="9.5"
        cy="6.5"
        r="2.5"
        className={strokeLine}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  )
}
