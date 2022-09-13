import classnames, { stroke, strokeWidth } from 'classnames/tailwind'

enum SealEyeColor {
  accent = 'stroke-accent',
  secondary = 'stroke-secondary-dimmed',
  tertiary = 'stroke-tertiary',
}

const commonStrokeWidth = strokeWidth('stroke-1.5')

export default function ({ reversed }: { reversed?: boolean }) {
  const strokeClass = (color: SealEyeColor) =>
    classnames(commonStrokeWidth, stroke(color))

  if (reversed)
    return (
      <svg
        width="55"
        height="46"
        viewBox="0 0 55 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.5877 11.3009C26.209 11.3009 25.0913 11.1356 25.0913 12.717C25.0913 14.2984 26.209 15.5804 27.5877 15.5804C28.9664 15.5804 30.0841 14.2984 30.0841 12.717C30.0841 11.1356 28.9664 11.3009 27.5877 11.3009ZM27.5877 11.3009C27.5877 10.3499 27.5877 8.23392 27.5877 7.37803M27.5877 7.37803C27.5877 4.52501 24.0215 4.52506 24.0215 7.37803M27.5877 7.37803C27.5877 4.52504 31.1539 4.52504 31.1539 7.37798"
          className={strokeClass(SealEyeColor.tertiary)}
        />
        <path
          d="M16.1756 11.3008L20.4551 10.5875"
          className={strokeClass(SealEyeColor.tertiary)}
        />
        <path
          d="M20.4533 8.44922L16.1738 7.73598"
          className={strokeClass(SealEyeColor.tertiary)}
        />
        <path
          d="M39.0002 11.3008L34.7207 10.5875"
          className={strokeClass(SealEyeColor.tertiary)}
        />
        <path
          d="M34.7205 8.44727L39 7.73402"
          className={strokeClass(SealEyeColor.tertiary)}
        />
        <path
          d="M51.2809 7.0858L30.9131 40.4149C29.3534 42.9671 25.6466 42.9671 24.0869 40.4149L3.7191 7.0858C2.09024 4.42038 4.00851 0.999996 7.13223 0.999996L47.8678 0.999999C50.9915 1 52.9098 4.42039 51.2809 7.0858Z"
          className={strokeClass(SealEyeColor.secondary)}
        />
        <path
          d="M19.652 25.4543C19.2205 24.8819 19.2205 24.1181 19.652 23.5457C20.839 21.9708 23.5956 19 27.5 19C31.4044 19 34.161 21.9708 35.348 23.5457C35.7795 24.1181 35.7795 24.8819 35.348 25.4543C34.161 27.0292 31.4044 30 27.5 30C23.5956 30 20.839 27.0292 19.652 25.4543Z"
          className={strokeClass(SealEyeColor.accent)}
        />
        <circle
          cx="27.5"
          cy="24.5"
          r="2.5"
          transform="rotate(-180 27.5 24.5)"
          className={strokeClass(SealEyeColor.accent)}
        />
      </svg>
    )

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="55"
      height="46"
      viewBox="0 0 55 46"
    >
      <path
        d="M27.4123 34.6991C28.791 34.6991 29.9086 34.8644 29.9086 33.283C29.9086 31.7016 28.791 30.4196 27.4123 30.4196C26.0336 30.4196 24.9159 31.7016 24.9159 33.283C24.9159 34.8644 26.0336 34.6991 27.4123 34.6991ZM27.4123 34.6991C27.4123 35.6501 27.4123 37.7661 27.4123 38.622M27.4123 38.622C27.4123 41.475 30.9785 41.4749 30.9785 38.622M27.4123 38.622C27.4123 41.475 23.8461 41.475 23.8461 38.622"
        className={strokeClass(SealEyeColor.tertiary)}
      />
      <path
        d="M38.8244 34.6992L34.5449 35.4125"
        className={strokeClass(SealEyeColor.tertiary)}
      />
      <path
        d="M34.5467 37.5508L38.8262 38.264"
        className={strokeClass(SealEyeColor.tertiary)}
      />
      <path
        d="M15.9998 34.6992L20.2793 35.4125"
        className={strokeClass(SealEyeColor.tertiary)}
      />
      <path
        d="M20.2795 37.5527L16 38.266"
        className={strokeClass(SealEyeColor.tertiary)}
      />
      <path
        d="M3.7191 38.9142L24.0869 5.58512C25.6466 3.03285 29.3534 3.03285 30.9131 5.58512L51.2809 38.9142C52.9098 41.5796 50.9915 45 47.8678 45H7.13223C4.00851 45 2.09024 41.5796 3.7191 38.9142Z"
        className={strokeClass(SealEyeColor.secondary)}
      />
      <path
        d="M35.348 20.5457C35.7795 21.1181 35.7795 21.8819 35.348 22.4543C34.161 24.0292 31.4044 27 27.5 27C23.5956 27 20.839 24.0292 19.652 22.4543C19.2205 21.8819 19.2205 21.1181 19.652 20.5457C20.839 18.9708 23.5956 16 27.5 16C31.4044 16 34.161 18.9708 35.348 20.5457Z"
        className={strokeClass(SealEyeColor.tertiary)}
      />
      <circle
        cx="27.5"
        cy="21.5"
        r="2.5"
        className={strokeClass(SealEyeColor.tertiary)}
      />
    </svg>
  )
}
