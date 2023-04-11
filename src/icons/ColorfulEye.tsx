import classnames, { fill, strokeWidth } from 'classnames/tailwind'

const fillClasses = classnames(
  fill('fill-primary-dimmed'),
  strokeWidth('stroke-1.5')
)

export default function ({ open }: { open?: boolean }) {
  if (open)
    return (
      <svg
        height="17"
        viewBox="0 0 24 17"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={fillClasses}
          d="M23 8.5C23 8.5 18.875 16 12 16C5.125 16 1 8.5 1 8.5C1 8.5 5.125 1 12 1C18.875 1 23 8.5 23 8.5Z"
          stroke="url(#eye_gradient_0)"
        />
        <ellipse
          className={fillClasses}
          cx="12"
          cy="8.5"
          rx="3"
          ry="3.5"
          stroke="url(#eye_gradient_1)"
        />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="eye_gradient_0"
            x1="4.3"
            x2="23"
            y1="8.5"
            y2="8.5"
          >
            <stop stop-color="var(--secondary)" />
            <stop offset="1" stop-color="var(--accent)" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="eye_gradient_1"
            x1="10"
            x2="15"
            y1="8.5"
            y2="8.5"
          >
            <stop stop-color="var(--secondary)" />
            <stop offset="1" stop-color="var(--accent)" />
          </linearGradient>
        </defs>
      </svg>
    )
  return (
    <svg
      height="12"
      viewBox="0 0 24 12"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={strokeWidth('stroke-1.5')}
        d="M21 1.052C21 4.41374 16.1111 7.13896 11.2218 7.13896C6.77778 7.13896 1 4.41374 1 1.052"
        stroke="url(#eye_gradient_0)"
      />
      <line
        className={strokeWidth('stroke-1.5')}
        stroke="url(#eye_gradient_1)"
        x1="4.5"
        x2="3"
        y1="6"
        y2="8"
      />
      <line
        className={strokeWidth('stroke-1.5')}
        stroke="url(#eye_gradient_2)"
        transform="matrix(0.5 0.866025 0.866025 -0.5 18.3926 4.78418)"
        x1="0.75"
        x2="3.7"
        y1="-0.75"
        y2="-0.75"
      />
      <line
        className={strokeWidth('stroke-1.5')}
        stroke="url(#eye_gradient_3)"
        x1="11"
        x2="11"
        y1="8"
        y2="11"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="eye_gradient_0"
          x1="9"
          x2="14"
          y1="1"
          y2="1"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="eye_gradient_1"
          x1="4"
          x2="3"
          y1="6"
          y2="8.5"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="eye_gradient_2"
          x1="4"
          x2="0"
          y1="-1"
          y2="-1"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="eye_gradient_3"
          x1="8.5"
          x2="14"
          y1="9"
          y2="10.5"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
      </defs>
    </svg>
  )
}
