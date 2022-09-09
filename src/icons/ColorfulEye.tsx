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
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23 8.5C23 8.5 18.875 16 12 16C5.125 16 1 8.5 1 8.5C1 8.5 5.125 1 12 1C18.875 1 23 8.5 23 8.5Z"
        stroke="url(#paint0_linear_57_19973)"
        className={fillClasses}
      />
      <ellipse
        cx="11.999"
        cy="8.49991"
        rx="3.23529"
        ry="3.40909"
        stroke="url(#paint1_linear_57_19973)"
        className={fillClasses}
      />
      <defs>
        <linearGradient
          id="paint0_linear_57_19973"
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
          id="paint1_linear_57_19973"
          x1="9.73426"
          y1="8.49991"
          x2="15.2343"
          y2="8.49991"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <svg
      width="22"
      height="12"
      viewBox="0 0 22 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 1.052C21 4.41374 16.1111 7.13896 11.2218 7.13896C6.77778 7.13896 1 4.41374 1 1.052"
        stroke="url(#paint0_linear_57_19933)"
        className={strokeWidth('stroke-1.5')}
      />
      <line
        x1="4.55772"
        y1="5.8087"
        x2="3.09076"
        y2="8.34956"
        stroke="url(#paint1_linear_57_19933)"
        className={strokeWidth('stroke-1.5')}
      />
      <line
        x1="0.75"
        y1="-0.75"
        x2="3.68393"
        y2="-0.75"
        transform="matrix(0.5 0.866025 0.866025 -0.5 18.3926 4.78418)"
        stroke="url(#paint2_linear_57_19933)"
        className={strokeWidth('stroke-1.5')}
      />
      <line
        x1="11.3145"
        y1="7.88916"
        x2="11.3145"
        y2="10.8231"
        stroke="url(#paint3_linear_57_19933)"
        className={strokeWidth('stroke-1.5')}
      />
      <defs>
        <linearGradient
          id="paint0_linear_57_19933"
          x1="9.11724"
          y1="1.05184"
          x2="14.2284"
          y2="1.05184"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_57_19933"
          x1="4.11326"
          y1="6.30949"
          x2="2.81364"
          y2="8.48633"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_57_19933"
          x1="3.82103"
          y1="-0.804936"
          x2="0.315722"
          y2="-0.791363"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_57_19933"
          x1="8.56445"
          y1="9.31307"
          x2="14.0083"
          y2="10.4513"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
      </defs>
    </svg>
  )
}
