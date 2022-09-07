import classnames, { stroke } from 'classnames/tailwind'

const strokeSecondaryDimmed = classnames(stroke('stroke-secondary-dimmed'))
const strokeTertiaryLine = classnames(stroke('stroke-tertiary'))

export default function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="55"
      height="46"
      viewBox="0 0 55 46"
      fill="none"
    >
      <path
        d="M27.4123 34.6991C28.791 34.6991 29.9086 34.8644 29.9086 33.283C29.9086 31.7016 28.791 30.4196 27.4123 30.4196C26.0336 30.4196 24.9159 31.7016 24.9159 33.283C24.9159 34.8644 26.0336 34.6991 27.4123 34.6991ZM27.4123 34.6991C27.4123 35.6501 27.4123 37.7661 27.4123 38.622M27.4123 38.622C27.4123 41.475 30.9785 41.4749 30.9785 38.622M27.4123 38.622C27.4123 41.475 23.8461 41.475 23.8461 38.622"
        className={strokeTertiaryLine}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M38.8244 34.6992L34.5449 35.4125"
        className={strokeTertiaryLine}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M34.5467 37.5508L38.8262 38.264"
        className={strokeTertiaryLine}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M15.9998 34.6992L20.2793 35.4125"
        className={strokeTertiaryLine}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M20.2795 37.5527L16 38.266"
        className={strokeTertiaryLine}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M3.7191 38.9142L24.0869 5.58512C25.6466 3.03285 29.3534 3.03285 30.9131 5.58512L51.2809 38.9142C52.9098 41.5796 50.9915 45 47.8678 45H7.13223C4.00851 45 2.09024 41.5796 3.7191 38.9142Z"
        className={strokeSecondaryDimmed}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M35.348 20.5457C35.7795 21.1181 35.7795 21.8819 35.348 22.4543C34.161 24.0292 31.4044 27 27.5 27C23.5956 27 20.839 24.0292 19.652 22.4543C19.2205 21.8819 19.2205 21.1181 19.652 20.5457C20.839 18.9708 23.5956 16 27.5 16C31.4044 16 34.161 18.9708 35.348 20.5457Z"
        className={strokeTertiaryLine}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <circle
        cx="27.5"
        cy="21.5"
        r="2.5"
        className={strokeTertiaryLine}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  )
}
