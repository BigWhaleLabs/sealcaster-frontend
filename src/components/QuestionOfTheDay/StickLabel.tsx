import QuestionOfTheDayLabel from 'icons/QuestionOfTheDayLabel'
import classnames, {
  inset,
  margin,
  position,
  zIndex,
} from 'classnames/tailwind'

const badgeWrapper = (mobile?: boolean) =>
  classnames(
    position('absolute'),
    inset('right-0', mobile ? 'bottom-0' : 'top-0'),
    margin(mobile ? '-mr-12.5' : '-mr-30', mobile ? '-mb-35' : '-mt-12.5'),
    zIndex('z-30')
  )

export default function ({ mobile }: { mobile?: boolean }) {
  return (
    <div className={badgeWrapper(mobile)}>
      <QuestionOfTheDayLabel mobile={mobile} />
    </div>
  )
}
