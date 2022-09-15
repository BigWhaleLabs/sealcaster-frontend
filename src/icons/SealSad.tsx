import classnames, { stroke, strokeWidth } from 'classnames/tailwind'

const strokeSecondary = classnames(
  stroke('stroke-secondary-dimmed'),
  strokeWidth('stroke-2')
)
const strokeTertiary = classnames(
  stroke('stroke-tertiary'),
  strokeWidth('stroke-2')
)

export default function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="65"
      viewBox="0 0 80 65"
    >
      <path
        d="M55.4429 34.035C55.4429 37.0132 53.0938 39.4274 50.1961 39.4274C47.2983 39.4274 44.9492 37.0132 44.9492 34.035C44.9492 31.0569 47.2983 34.035 50.1961 34.035C53.0938 34.035 55.4429 31.0569 55.4429 34.035Z"
        stroke="#01FEB6"
        stroke-width="2"
      />
      <path
        d="M39.8761 47.9278C41.8369 47.9278 43.4265 48.1628 43.4265 45.9137C43.4265 43.6646 41.8369 41.8414 39.8761 41.8414C37.9153 41.8414 36.3258 43.6646 36.3258 45.9137C36.3258 48.1628 37.9153 47.9278 39.8761 47.9278ZM39.8761 47.9278C39.8761 49.2803 39.8761 52.2897 39.8761 53.5069M39.8761 53.5069C39.8761 57.5646 46.4004 54.0449 46.4004 58.3112M39.8761 53.5069C39.8761 57.5645 33.6004 53.5069 33.6004 58.3115"
        stroke="#01FEB6"
        stroke-width="2"
      />
      <path
        d="M35.1578 34.0365C35.1578 37.0146 32.8087 39.4289 29.9109 39.4289C27.0132 39.4289 24.6641 37.0146 24.6641 34.0365C24.6641 31.0584 27.0132 34.0365 29.9109 34.0365C32.8087 34.0365 35.1578 31.0584 35.1578 34.0365Z"
        className={strokeTertiary}
      />
      <path d="M56.1059 47.9282L50.0195 48.9426" className={strokeTertiary} />
      <path d="M50.023 51.9849L56.1094 52.9993" className={strokeTertiary} />
      <path d="M23.6441 47.9282L29.7305 48.9426" className={strokeTertiary} />
      <path d="M29.7309 51.9868L23.6445 53.0012" className={strokeTertiary} />
      <path
        d="M4.60776 57.9142L36.5867 5.58512C38.1464 3.03285 41.8532 3.03284 43.4129 5.58511L75.3918 57.9142C77.0207 60.5796 75.1024 64 71.9787 64H8.0209C4.89718 64 2.9789 60.5796 4.60776 57.9142Z"
        className={strokeSecondary}
      />
    </svg>
  )
}
