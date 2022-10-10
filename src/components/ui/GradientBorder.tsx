import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  backgroundColor,
  backgroundImage,
  borderRadius,
  boxShadow,
  gradientColorStops,
  padding,
  width,
} from 'classnames/tailwind'

const generalBorderRadius = (smallRadius?: boolean) =>
  borderRadius(smallRadius ? 'rounded-2xl' : 'rounded-full')

const parentButtonWrapper = (smallRadius?: boolean, withoutShadow?: boolean) =>
  classnames(
    generalBorderRadius(smallRadius),
    backgroundImage('bg-gradient-to-r'),
    padding('p-px'),
    gradientColorStops('from-secondary', 'to-accent'),
    withoutShadow
      ? undefined
      : boxShadow(
          'shadow-2xl',
          'hover:shadow-lg',
          'active:shadow-button-active'
        )
  )
const innerButtonWrapper = (smallRadius?: boolean) =>
  classnames(
    width('w-full'),
    generalBorderRadius(smallRadius),
    backgroundColor('bg-primary-dark')
  )

export default function ({
  children,
  smallRadius,
  withoutShadow,
}: ChildrenProp & { smallRadius?: boolean; withoutShadow?: boolean }) {
  return (
    <div className={parentButtonWrapper(smallRadius, withoutShadow)}>
      <div className={innerButtonWrapper(smallRadius)}>{children}</div>
    </div>
  )
}
