import ChildrenProp from 'models/ChildrenProp'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  borderRadius,
  overflow,
  position,
  width,
} from 'classnames/tailwind'

const wrapper = classnames(width('w-full'), position('relative'))

export default function ({ children }: ChildrenProp) {
  return (
    <div className={wrapper}>
      <div className={classNamesToString('animated-blur')} />
      <div
        className={classNamesToString(
          borderRadius('rounded-2xl'),
          overflow('overflow-hidden'),
          'animated-border'
        )}
      >
        {children}
      </div>
    </div>
  )
}
