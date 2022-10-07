import QuestionOfTheDayLabel from 'icons/QuestionOfTheDayLabel'
import classnames, { inset, position } from 'classnames/tailwind'

const badgeWrapper = (mobile?: boolean) =>
  classnames(
    position('absolute'),
    inset(
      mobile ? '-right-12.5' : '-right-30',
      mobile ? '-bottom-35' : '-top-12.5'
    )
  )

export default function ({ mobile }: { mobile?: boolean }) {
  return (
    <div className={badgeWrapper(mobile)}>
      <QuestionOfTheDayLabel mobile={mobile} />
    </div>
  )
}
