import classnames, { TStroke, stroke, strokeWidth } from 'classnames/tailwind'

const commonStroke = (color: TStroke, widthTwo?: boolean) =>
  classnames(strokeWidth(widthTwo ? 'stroke-2' : 'stroke-1.5'), stroke(color))

export default function () {
  return (
    <svg height="23" viewBox="0 0 310 31" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M165.619 14.5419C166.032 15.1216 166.032 15.8784 165.619 16.4581C164.177 18.4804 160.33 23 154.75 23C149.17 23 145.323 18.4804 143.881 16.4581C143.468 15.8784 143.468 15.1216 143.881 14.5419C145.323 12.5196 149.17 8 154.75 8C160.33 8 164.177 12.5196 165.619 14.5419Z"
        className={commonStroke('stroke-formal-accent')}
      />
      <ellipse
        cx="155"
        cy="15.5"
        rx="3.4"
        ry="3.4"
        className={commonStroke('stroke-formal-accent')}
      />
      <path
        d="M173.24 15L268.24 15"
        className={commonStroke('stroke-formal-accent', true)}
      />
      <path
        d="M259.1 17.9571L266.534 5.79256C267.314 4.51643 269.167 4.51642 269.947 5.79256L277.381 17.9571C278.195 19.2898 277.236 21 275.674 21L260.806 21C259.244 21 258.285 19.2898 259.1 17.9571Z"
        className={commonStroke('stroke-primary-semi-dimmed', true)}
      />
      <g filter="url(#filter0_d_57_21794)">
        <path
          d="M268.75 15L277.578 6.17157C278.329 5.42143 279.346 5 280.407 5H292.75"
          className={commonStroke('stroke-accent', true)}
        />
      </g>
      <g filter="url(#filter1_d_57_21794)">
        <path
          d="M268.75 15L277.578 23.8284C278.329 24.5786 279.346 25 280.407 25H304.25"
          className={commonStroke('stroke-secondary', true)}
        />
      </g>
      <path
        d="M136.76 16L41.7598 16"
        className={commonStroke('stroke-formal-accent', true)}
      />
      <path
        d="M50.9002 18.9571L43.4663 6.79256C42.6865 5.51643 40.8331 5.51642 40.0532 6.79256L32.6193 18.9571C31.8049 20.2898 32.764 22 34.3259 22L49.1937 22C50.7555 22 51.7147 20.2898 50.9002 18.9571Z"
        className={commonStroke('stroke-primary-semi-dimmed', true)}
      />
      <g filter="url(#filter2_d_57_21794)">
        <path
          d="M41.25 16L32.4216 7.17157C31.6714 6.42143 30.654 6 29.5931 6H17.25"
          className={commonStroke('stroke-accent', true)}
        />
      </g>
      <g filter="url(#filter3_d_57_21794)">
        <path
          d="M41.25 16L32.4216 24.8284C31.6714 25.5786 30.654 26 29.5931 26H5.75"
          className={commonStroke('stroke-secondary', true)}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_57_21794"
          x="263.75"
          y="0"
          width="34"
          height="20"
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
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.996078 0 0 0 0 0.847059 0 0 0 0 0.137255 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_57_21794"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_57_21794"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_57_21794"
          x="263.75"
          y="10"
          width="45.5"
          height="20"
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
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.483333 0 0 0 0 0.929029 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_57_21794"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_57_21794"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_57_21794"
          x="12.25"
          y="1"
          width="34"
          height="20"
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
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.996078 0 0 0 0 0.847059 0 0 0 0 0.137255 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_57_21794"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_57_21794"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_d_57_21794"
          x="0.75"
          y="11"
          width="45.5"
          height="20"
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
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.483333 0 0 0 0 0.929029 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_57_21794"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_57_21794"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}
