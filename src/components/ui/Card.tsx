import {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  classnames,
  height,
  maxHeight,
  maxWidth,
  padding,
  position,
  space,
  transitionProperty,
  width,
  wordBreak,
  zIndex,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'
import GradientBorder from 'components/ui/GradientBorder'
import classNamesToString from 'helpers/classNamesToString'

interface CardProps {
  small?: boolean
  blueBg?: boolean
  gradient?: boolean
  hoverEffect?: boolean
  error?: boolean
  smallRadius?: boolean
}

const cardContainer = ({
  blueBg,
  error,
  gradient,
  hoverEffect,
  small,
  smallRadius,
}: CardProps) => {
  const card = classnames(
    position('relative'),
    borderWidth(blueBg ? 'border-0' : { border: !gradient }),
    borderColor(error ? 'border-error' : 'border-half-grey'),
    borderRadius(smallRadius ? 'rounded-lg' : 'rounded-2xl'),
    backgroundColor(
      blueBg
        ? 'bg-primary-background'
        : {
            'bg-primary-dark': true,
            'hover:bg-primary-semi-dark': hoverEffect,
          }
    ),
    padding(small ? 'p-4' : 'p-6'),
    maxWidth('max-w-full'),
    maxHeight('max-h-full'),
    height('h-fit'),
    width('w-full'),
    space('space-y-4'),
    wordBreak('break-words'),
    zIndex('z-20'),
    transitionProperty('transition-colors')
  )
  // added via css because tailwind class overwrites by material-ui
  return classNamesToString(card, 'shadow-card')
}

export default function ({
  blueBg,
  children,
  error,
  gradient,
  hoverEffect,
  small,
  smallRadius,
}: ChildrenProp & {
  small?: boolean
  blueBg?: boolean
  gradient?: boolean
  hoverEffect?: boolean
  error?: boolean
  smallRadius?: boolean
}) {
  const content = (
    <div
      className={cardContainer({
        blueBg,
        error,
        gradient,
        hoverEffect,
        small,
        smallRadius,
      })}
    >
      {children}
    </div>
  )

  return gradient ? (
    <GradientBorder smallRadius withoutShadow>
      {content}
    </GradientBorder>
  ) : (
    content
  )
}
