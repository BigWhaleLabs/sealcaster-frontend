import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  animation,
  borderColor,
  borderRadius,
  borderWidth,
  height,
  overflow,
  padding,
  position,
} from 'classnames/tailwind'

const loader = classnames(position('relative'), overflow('overflow-hidden'))
const loaderDiv = classnames(
  height('h-full'),
  borderRadius('rounded-full'),
  padding('p-1'),
  borderWidth('border'),
  borderColor('border-transparent', 'border-t-accent', 'border-b-secondary'),
  animation('animate-rotate')
)

export default function () {
  return (
    <div className={loader}>
      <div className={classNamesToString(loaderDiv, 'loading-pause')}>
        <div className={classNamesToString(loaderDiv, 'loading-pause')}>
          <div className={classNamesToString(loaderDiv, 'loading-pause')}>
            <div className={classNamesToString(loaderDiv, 'loading-pause')}>
              <div className={loaderDiv}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
