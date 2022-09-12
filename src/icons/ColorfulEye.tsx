import classnames, { fill, strokeWidth } from 'classnames/tailwind'

const fillClasses = classnames(
  fill('fill-primary-dimmed'),
  strokeWidth('stroke-1.5')
)

export default function ({ open }: { open?: boolean }) {
  return open ? (
    <svg
      width="24"
      height="17"
      viewBox="0 0 24 17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23 8.5C23 8.5 18.875 16 12 16C5.125 16 1 8.5 1 8.5C1 8.5 5.125 1 12 1C18.875 1 23 8.5 23 8.5Z"
        stroke="url(#eye_gradient_0)"
        className={fillClasses}
      />
      <ellipse
        cx="12"
        cy="8.5"
        rx="3"
        ry="3..5"
        stroke="url(#eye_gradient_1)"
        className={fillClasses}
      />
      <defs>
        <linearGradient
          id="eye_gradient_0"
          x1="4.3"
          y1="8.5"
          x2="23"
          y2="8.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
        <linearGradient
          id="eye_gradient_1"
          x1="10"
          y1="8.5"
          x2="15"
          y2="8.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <svg
      width="24"
      height="12"
      viewBox="0 0 24 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 1.052C21 4.41374 16.1111 7.13896 11.2218 7.13896C6.77778 7.13896 1 4.41374 1 1.052"
        stroke="url(#eye_gradient_0)"
        className={strokeWidth('stroke-1.5')}
      />
      <line
        x1="4.5"
        y1="6"
        x2="3"
        y2="8"
        stroke="url(#eye_gradient_1)"
        className={strokeWidth('stroke-1.5')}
      />
      <line
        x1="0.75"
        y1="-0.75"
        x2="3.7"
        y2="-0.75"
        transform="matrix(0.5 0.866025 0.866025 -0.5 18.3926 4.78418)"
        stroke="url(#eye_gradient_2)"
        className={strokeWidth('stroke-1.5')}
      />
      <line
        x1="11"
        y1="8"
        x2="11"
        y2="11"
        stroke="url(#eye_gradient_3)"
        className={strokeWidth('stroke-1.5')}
      />
      <defs>
        <linearGradient
          id="eye_gradient_0"
          x1="9"
          y1="1"
          x2="14"
          y2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
        <linearGradient
          id="eye_gradient_1"
          x1="4"
          y1="6"
          x2="3"
          y2="8.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
        <linearGradient
          id="eye_gradient_2"
          x1="4"
          y1="-1"
          x2="0"
          y2="-1"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
        <linearGradient
          id="eye_gradient_3"
          x1="8.5"
          y1="9"
          x2="14"
          y2="10.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
      </defs>
    </svg>
  )
}
