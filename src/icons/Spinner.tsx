import { animation } from 'classnames/tailwind'

export default function () {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      xmlns="http://www.w3.org/2000/svg"
      className={animation('animate-rotate')}
    >
      <path
        d="M11.5 6C11.5 8.76142 9.26142 11 6.5 11C3.73858 11 1.5 8.76142 1.5 6C1.5 3.23858 3.73858 1 6.5 1"
        stroke="currentColor"
        stroke-width="2"
      />
    </svg>
  )
}
