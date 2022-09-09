import classnames, { fill, strokeWidth } from 'classnames/tailwind'

const fillClasses = classnames(
  fill('fill-primary-dimmed'),
  strokeWidth('stroke-1.5')
)

export default function () {
  return (
    <svg
      width="15"
      height="18"
      viewBox="0 0 15 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="4"
        width="10"
        height="13"
        className={fillClasses}
        stroke="url(#paint0_linear_57_19969)"
      />
      <rect
        x="1"
        y="1"
        width="10"
        height="13"
        className={fillClasses}
        stroke="url(#paint1_linear_57_19969)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_57_19969"
          x1="5.5"
          y1="10.5"
          x2="14"
          y2="10.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_57_19969"
          x1="2.5"
          y1="7.5"
          x2="11"
          y2="7.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
      </defs>
    </svg>
  )
}
