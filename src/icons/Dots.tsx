import { fill } from 'classnames/tailwind'

const fillAccent = fill('fill-accent')
const fillSecondary = fill('fill-secondary')
const fillPrimary = fill('fill-primary')
const fillTertiary = fill('fill-tertiary')

export default function () {
  return (
    <svg
      height="6"
      viewBox="0 0 36 6"
      width="36"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className={fillAccent} cx="3" cy="3" r="3" />
      <circle className={fillTertiary} cx="13" cy="3" r="3" />
      <circle className={fillPrimary} cx="23" cy="3" r="3" />
      <circle className={fillSecondary} cx="33" cy="3" r="3" />
    </svg>
  )
}
