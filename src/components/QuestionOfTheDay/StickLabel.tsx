import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import QuestionOfTheDayLabel from 'icons/QuestionOfTheDayLabel'
import classnames, { inset, margin, position } from 'classnames/tailwind'

const badgeWrapper = (mobile?: boolean) =>
  classnames(
    position('absolute'),
    inset('right-0', mobile ? 'bottom-0' : 'top-0'),
    margin(mobile ? '-mr-12.5' : '-mr-30', mobile ? '-mb-30' : '-mt-12.5')
  )

export default function () {
  return (
    <>
      <div className={classnames(displayTo('lg'), badgeWrapper(true))}>
        <QuestionOfTheDayLabel />
      </div>
      <div className={classnames(displayFrom('lg'), badgeWrapper(false))}>
        <QuestionOfTheDayLabel />
      </div>
    </>
  )
}
