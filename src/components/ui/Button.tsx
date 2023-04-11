import { HTMLAttributes } from 'preact/compat'
import {
  alignItems,
  backgroundClip,
  backgroundColor,
  backgroundImage,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  boxShadowColor,
  brightness,
  classnames,
  cursor,
  display,
  fontFamily,
  fontSize,
  fontWeight,
  gap,
  gradientColorStops,
  height,
  justifyContent,
  lineHeight,
  opacity,
  padding,
  textAlign,
  textColor,
  transitionDuration,
  transitionProperty,
  transitionTimingFunction,
  width,
} from 'classnames/tailwind'
import Arrow from 'icons/Arrow'
import Loading from 'icons/Loading'
import classNamesToString from 'helpers/classNamesToString'

const commonClasses = ({
  available,
  center,
  fullWidth,
  fullWidthOnMobile,
  gradientFont,
  heightFit,
  small,
  type,
}: {
  type: ButtonType
  fullWidth?: boolean
  fullWidthOnMobile?: boolean
  center?: boolean
  available?: boolean
  small?: boolean
  gradientFont?: boolean
  heightFit?: boolean
}) => {
  const isNotTertiary = type !== 'tertiary'

  return classnames(
    display('flex'),
    gap('gap-x-2'),
    justifyContent({ 'justify-center': center }),
    alignItems('items-center'),
    fontWeight('font-bold'),
    fontFamily('font-primary'),
    transitionProperty('transition-all'),
    transitionTimingFunction('ease-in-out'),
    transitionDuration('duration-100'),
    cursor({ 'cursor-not-allowed': !available }),
    opacity({ 'opacity-50': !available }),
    isNotTertiary
      ? boxShadow({
          'active:shadow-button-active': available && !gradientFont,
          'hover:shadow-lg': available,
          'shadow-2xl': available,
        })
      : undefined,
    width({
      'md:w-fit': fullWidthOnMobile,
      'w-full': fullWidth || fullWidthOnMobile,
    }),
    height({ 'h-fit': heightFit }),
    textAlign({ 'text-center': center }),
    fontSize(small ? 'text-sm' : 'text-lg'),
    lineHeight(small ? 'leading-5' : 'leading-7'),
    isNotTertiary
      ? padding(
          small
            ? { 'px-4': true, 'py-2': true }
            : { 'px-6': true, 'py-4': true }
        )
      : undefined
  )
}

const button = ({
  available,
  center,
  fullWidth,
  fullWidthOnMobile,
  gradientFont,
  heightFit,
  small,
  type,
}: ButtonProps & { available?: boolean }) =>
  classnames(
    commonClasses({
      available,
      center,
      fullWidth,
      fullWidthOnMobile,
      gradientFont,
      heightFit,
      small,
      type,
    }),
    colorClasses(type, available, gradientFont)
  )

const colorClasses = (
  type: ButtonType,
  available?: boolean,
  gradientFont?: boolean
) => {
  const hasNoGradient = !gradientFont

  switch (type) {
    case 'primary':
      return classnames(
        textColor('text-primary-dark'),
        borderRadius('rounded-full'),
        backgroundColor('bg-tertiary'),
        boxShadowColor(
          'shadow-tertiary',
          'hover:shadow-tertiary',
          'active:shadow-tertiary'
        ),
        boxShadow({ 'shadow-button': available }),
        brightness({
          'active:brightness-90': available,
          'hover:brightness-95': available,
        })
      )
    case 'secondary':
      return classnames(
        borderWidth('border'),
        borderRadius('rounded-full'),
        borderColor({
          'active:border-secondary': hasNoGradient,
          'border-secondary': hasNoGradient,
          'border-transparent': gradientFont,
          'hover:border-secondary': hasNoGradient,
        }),
        backgroundImage('bg-gradient-to-r'),
        textColor('text-secondary'),
        gradientColorStops({
          'active:from-accent-light-active-transparent': available,
          'active:to-secondary-light-active-transparent': available,
          'from-primary-dark': gradientFont,
          'hover:from-accent-light-transparent': available,
          'hover:to-secondary-light-transparent': available,
          'to-primary-dark': gradientFont,
        })
      )
    default:
      return backgroundColor('bg-transparent')
  }
}

const textGradient = (available?: boolean) =>
  classnames(
    textColor({
      'active:text-accent': available,
      'text-transparent': true,
    }),
    backgroundClip('bg-clip-text'),
    backgroundImage('bg-gradient-to-r'),
    gradientColorStops('from-secondary', 'to-accent')
  )
const textGradientClasses = (available?: boolean) =>
  classNamesToString(textGradient(available), 'clip-background')

interface ButtonProps {
  type: ButtonType
  disabled?: boolean
  loading?: boolean
  small?: boolean
  withArrow?: boolean
  gradientFont?: boolean
  loadingOverflow?: boolean
  url?: string
  fullWidth?: boolean
  fullWidthOnMobile?: boolean
  center?: boolean
  heightFit?: boolean
}

type ButtonType = 'primary' | 'secondary' | 'tertiary'

export default function ({
  center,
  children,
  disabled,
  fullWidth,
  fullWidthOnMobile,
  gradientFont,
  heightFit,
  loading,
  loadingOverflow,
  small,
  type = 'tertiary',
  url,
  withArrow,
  ...rest
}: Omit<HTMLAttributes<HTMLButtonElement>, 'loading'> & ButtonProps) {
  const showContent = !loadingOverflow || !loading
  const available = !loading && !disabled

  return (
    <button
      disabled={!available}
      className={button({
        available,
        center,
        fullWidth,
        fullWidthOnMobile,
        gradientFont,
        heightFit,
        small,
        type,
      })}
      onClick={() => {
        if (url) window.open(url, '_blank')
      }}
      {...rest}
    >
      {loading && <Loading small={small} />}
      {showContent && (
        <>
          {gradientFont ? (
            <span className={textGradientClasses(available)}>{children}</span>
          ) : (
            <>{children}</>
          )}
        </>
      )}
      {withArrow && (
        <div className={width('w-2')}>
          <Arrow horizontal />
        </div>
      )}
    </button>
  )
}
