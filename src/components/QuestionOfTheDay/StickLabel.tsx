import QuestionOfTheDayLabel from 'icons/QuestionOfTheDayLabel'
import classnames, {
  dropShadow,
  inset,
  position,
  transforms,
} from 'classnames/tailwind'

const badgeWrapper = (mobile?: boolean) =>
  classnames(
    position('absolute'),
    inset(
      'xs:-right-2.5',
      mobile ? 'body:-right-12.5' : 'body:-right-25',
      mobile ? '-bottom-27.5' : '-top-2.5'
    ),
    transforms('-rotate-15'),
    dropShadow('drop-shadow-accent-light-transparent')
  )

export default function ({ mobile }: { mobile?: boolean }) {
  return (
    <div className={badgeWrapper(mobile)}>
      <QuestionOfTheDayLabel mobile={mobile} />
    </div>
  )
}
