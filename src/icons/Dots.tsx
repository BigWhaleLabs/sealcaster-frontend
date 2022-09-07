import classnames, { fill } from 'classnames/tailwind'

const fillAccent = classnames(fill('fill-accent'))
const fillSecondary = classnames(fill('fill-secondary'))
const fillPrimary = classnames(fill('fill-primary'))
const fillTertiary = classnames(fill('fill-tertiary'))

export default function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="6"
      viewBox="0 0 36 6"
      fill="none"
    >
      <circle cx="3" cy="3.00024" r="3" className={fillAccent} />
      <circle cx="13" cy="3.00024" r="3" className={fillTertiary} />
      <circle cx="23" cy="3.00024" r="3" className={fillPrimary} />
      <circle cx="33" cy="3.00024" r="3" className={fillSecondary} />
    </svg>
  )
}
