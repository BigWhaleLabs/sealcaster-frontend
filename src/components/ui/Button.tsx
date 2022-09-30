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
  flexDirection,
  fontFamily,
  fontSize,
  fontWeight,
  gradientColorStops,
  height,
  justifyContent,
  lineHeight,
  opacity,
  outlineStyle,
  padding,
  space,
  textAlign,
  textColor,
  transitionDuration,
  transitionProperty,
  transitionTimingFunction,
  width,
} from 'classnames/tailwind'
import Arrow from 'icons/Arrow'
import Loading from 'icons/Loading'

const commonClasses = ({
  type,
  fullWidth,
  center,
  available,
  small,
  gradientFont,
  heightFit,
}: {
  type: ButtonType
  fullWidth?: boolean
  center?: boolean
  available?: boolean
  small?: boolean
  gradientFont?: boolean
  heightFit?: boolean
}) => {
  const isNotTertiary = type !== 'tertiary'
  return classnames(
    display('flex'),
    flexDirection('flex-row'),
    justifyContent({ 'justify-center': center }),
    alignItems('items-center'),
    fontWeight('font-bold'),
    fontFamily('font-primary'),
    transitionProperty('transition-all'),
    transitionTimingFunction('ease-in-out'),
    transitionDuration('duration-100'),
    cursor({ 'cursor-not-allowed': !available }),
    outlineStyle('focus:outline-none'),
    opacity({ 'opacity-50': !available }),
    isNotTertiary
      ? boxShadow({
          'shadow-2xl': available,
          'hover:shadow-lg': available,
          'active:shadow-button-active': available && !gradientFont,
        })
      : undefined,
    width({ 'w-full': fullWidth }),
    height({ 'h-fit': heightFit }),
    textAlign({ 'text-center': center }),
    fontSize(small ? 'text-sm' : 'text-lg'),
    lineHeight(small ? 'leading-5' : 'leading-7'),
    isNotTertiary
      ? padding(
          small
            ? { 'py-2': true, 'px-4': true }
            : { 'py-4': true, 'px-6': true }
        )
      : undefined,
    space('space-x-2')
  )
}

const button = ({
  fullWidth,
  available,
  center,
  type,
  small,
  gradientFont,
  heightFit,
}: ButtonProps & { available?: boolean }) =>
  classnames(
    commonClasses({
      type,
      fullWidth,
      center,
      available,
      small,
      gradientFont,
      heightFit,
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
          'hover:brightness-95': available,
          'active:brightness-90': available,
        })
      )
    case 'secondary':
      return classnames(
        borderWidth('border'),
        borderRadius('rounded-full'),
        borderColor({
          'border-transparent': gradientFont,
          'border-secondary': hasNoGradient,
          'hover:border-secondary': hasNoGradient,
          'active:border-secondary': hasNoGradient,
        }),
        backgroundImage('bg-gradient-to-r'),
        textColor('text-secondary'),
        gradientColorStops({
          'from-primary-dark': gradientFont,
          'to-primary-dark': gradientFont,
          'hover:from-accent-light-transparent': available,
          'hover:to-secondary-light-transparent': available,
          'active:from-accent-light-active-transparent': available,
          'active:to-secondary-light-active-transparent': available,
        })
      )
    default:
      return backgroundColor('bg-transparent')
  }
}

const textGradient = (available?: boolean) =>
  classnames(
    textColor({
      'text-transparent': true,
      'active:text-accent': available,
    }),
    backgroundClip('bg-clip-text'),
    backgroundImage('bg-gradient-to-r'),
    gradientColorStops('from-secondary', 'to-accent')
  )

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
  center?: boolean
  heightFit?: boolean
}

type ButtonType = 'primary' | 'secondary' | 'tertiary'

export default function ({
  fullWidth,
  center,
  small,
  withArrow,
  type = 'tertiary',
  loading,
  disabled,
  children,
  gradientFont,
  loadingOverflow,
  url,
  heightFit,
  ...rest
}: Omit<HTMLAttributes<HTMLButtonElement>, 'loading'> & ButtonProps) {
  const showContent = !loadingOverflow || !loading
  const available = !loading && !disabled

  return (
    <button
      className={button({
        fullWidth,
        available,
        center,
        type,
        small,
        gradientFont,
        heightFit,
      })}
      onClick={() => {
        if (url) window.open(url, '_blank')
      }}
      disabled={!available}
      {...rest}
    >
      {loading && <Loading small={small} />}
      {showContent && (
        <>
          {gradientFont ? (
            <span className={textGradient(available)}>{children}</span>
          ) : (
            <div>{children}</div>
          )}
        </>
      )}
      {withArrow && (
        <div className={width('w-4')}>
          <Arrow horizontal />
        </div>
      )}
    </button>
  )
}
