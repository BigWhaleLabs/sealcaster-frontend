import classnames, { fill, stroke, strokeWidth } from 'classnames/tailwind'

const triangle = classnames(
  stroke('stroke-secondary'),
  strokeWidth('stroke-2'),
  fill('fill-primary-background')
)
const pathClass = classnames(strokeWidth('stroke-2'), stroke('stroke-tertiary'))

export default function () {
  return (
    <svg
      width="114"
      height="103"
      viewBox="0 0 114 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_57_17088)">
        <path
          d="M21.6078 73.9142L53.5867 21.5851C55.1464 19.0329 58.8532 19.0328 60.4129 21.5851L92.3918 73.9142C94.0207 76.5796 92.1024 80 88.9787 80H25.0209C21.8972 80 19.9789 76.5796 21.6078 73.9142Z"
          className={triangle}
        />
        <path
          d="M61.9477 54.1026C61.9477 51.1245 64.2968 48.7103 67.1946 48.7103C70.0923 48.7103 72.4414 51.1245 72.4414 54.1026C72.4414 57.0808 70.0923 54.1027 67.1946 54.1027C64.2968 54.1027 61.9477 57.0808 61.9477 54.1026Z"
          className={pathClass}
        />
        <path
          d="M56.8753 63.9265C58.8361 63.9265 60.4257 64.1615 60.4257 61.9124C60.4257 59.6633 58.8361 57.8401 56.8753 57.8401C54.9145 57.8401 53.3249 59.6633 53.3249 61.9124C53.3249 64.1615 54.9145 63.9265 56.8753 63.9265ZM56.8753 63.9265C56.8753 65.279 56.8753 68.2884 56.8753 69.5056M56.8753 69.5056C56.8753 73.5633 61.9473 73.5632 61.9473 69.5056M56.8753 69.5056C56.8753 73.5632 51.8034 73.5632 51.8034 69.5057"
          className={pathClass}
        />
        <path
          d="M41.6645 54.1026C41.6645 51.1245 44.0136 48.7103 46.9114 48.7103C49.8091 48.7103 52.1582 51.1245 52.1582 54.1026C52.1582 57.0808 49.8091 54.1027 46.9114 54.1027C44.0136 54.1027 41.6645 57.0808 41.6645 54.1026Z"
          className={pathClass}
        />
        <path d="M73.1059 63.9263L67.0195 64.9407" className={pathClass} />
        <path d="M67.023 67.9834L73.1094 68.9978" className={pathClass} />
        <path d="M40.6441 63.9263L46.7305 64.9407" className={pathClass} />
        <path d="M46.7309 67.9844L40.6445 68.9988" className={pathClass} />
      </g>
      <defs>
        <filter
          id="filter0_d_57_17088"
          x="0.0136719"
          y="0.670898"
          width="113.973"
          height="102.329"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.811765 0 0 0 0 0.415686 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_57_17088"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_57_17088"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}
