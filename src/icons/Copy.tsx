import classnames, { fill, strokeWidth } from 'classnames/tailwind'

const fillClasses = classnames(
  fill('fill-primary-dimmed'),
  strokeWidth('stroke-1.5')
)

export default function () {
  return (
    <svg
      fill="none"
      height="18"
      viewBox="0 0 15 18"
      width="15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className={fillClasses}
        height="13"
        stroke="url(#paint0_linear_57_19969)"
        width="10"
        x="4"
        y="4"
      />
      <rect
        className={fillClasses}
        height="13"
        stroke="url(#paint1_linear_57_19969)"
        width="10"
        x="1"
        y="1"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_57_19969"
          x1="5.5"
          x2="14"
          y1="10.5"
          y2="10.5"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear_57_19969"
          x1="2.5"
          x2="11"
          y1="7.5"
          y2="7.5"
        >
          <stop stop-color="var(--secondary)" />
          <stop offset="1" stop-color="var(--accent)" />
        </linearGradient>
      </defs>
    </svg>
  )
}
