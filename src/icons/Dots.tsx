import { fill } from 'classnames/tailwind'

const fillAccent = fill('fill-accent')
const fillSecondary = fill('fill-secondary')
const fillPrimary = fill('fill-primary')
const fillTertiary = fill('fill-tertiary')

export default function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="6"
      viewBox="0 0 36 6"
    >
      <circle cx="3" cy="3" r="3" className={fillAccent} />
      <circle cx="13" cy="3" r="3" className={fillTertiary} />
      <circle cx="23" cy="3" r="3" className={fillPrimary} />
      <circle cx="33" cy="3" r="3" className={fillSecondary} />
    </svg>
  )
}
