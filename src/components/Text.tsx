import { NavLink } from 'react-router-dom'
import {
  TDropShadow,
  TGradientColorStops,
  TTextColor,
  backgroundClip,
  backgroundImage,
  classnames,
  dropShadow,
  fontFamily,
  fontSize,
  fontWeight,
  gradientColorStops,
  lineHeight,
  textAlign,
  textColor,
  textDecoration,
  whitespace,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

const accentText = (
  color: TTextColor,
  bold?: boolean,
  small?: boolean,
  primary?: boolean,
  shadow?: TDropShadow
) =>
  classnames(
    textColor(color),
    fontFamily(primary ? 'font-primary' : undefined),
    fontWeight(bold ? 'font-bold' : 'font-normal'),
    fontSize(small ? 'text-sm' : undefined),
    dropShadow(shadow)
  )
export function AccentText({
  color,
  bold,
  small,
  primary,
  shadow,
  children,
}: ChildrenProp & {
  color: TTextColor
  bold?: boolean
  small?: boolean
  primary?: boolean
  shadow?: TDropShadow
}) {
  return (
    <span className={accentText(color, bold, small, primary, shadow)}>
      {children}
    </span>
  )
}

const linkText = (
  small?: boolean,
  extraSmall?: boolean,
  bold?: boolean,
  gradientFrom?: TGradientColorStops,
  gradientTo?: TGradientColorStops
) =>
  classnames(
    textDecoration('no-underline'),
    textColor(gradientFrom && gradientTo ? 'text-transparent' : 'text-primary'),
    backgroundImage(
      gradientFrom && gradientTo ? 'bg-gradient-to-r' : undefined
    ),
    backgroundClip(gradientFrom && gradientTo ? 'bg-clip-text' : undefined),
    gradientColorStops(gradientFrom, gradientTo),
    fontWeight({ 'font-bold': bold }),
    fontSize({ 'text-sm': small, 'text-xs': extraSmall }),
    lineHeight(small ? 'leading-4' : 'leading-5')
  )
export function LinkText({
  url,
  bold,
  small,
  extraSmall,
  internal,
  title,
  children,
  gradientFrom,
  gradientTo,
}: ChildrenProp & {
  url: string
  small?: boolean
  extraSmall?: boolean
  internal?: boolean
  bold?: boolean
  title?: string
  gradientFrom?: TGradientColorStops
  gradientTo?: TGradientColorStops
}) {
  if (internal)
    return (
      <NavLink
        to={url}
        className={linkText(small, extraSmall, bold, gradientFrom, gradientTo)}
      >
        {children}
      </NavLink>
    )
  return (
    <a
      className={linkText(small, extraSmall, bold, gradientFrom, gradientTo)}
      href={url}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

const bodyText = (
  primary?: boolean,
  bold?: boolean,
  small?: boolean,
  noWrap?: boolean,
  center?: boolean,
  inheritColor?: boolean
) =>
  classnames(
    fontFamily({ 'font-primary': primary }),
    textColor(inheritColor ? 'text-inherit' : 'text-formal-accent'),
    textAlign({ 'text-center': center }),
    fontWeight({ 'font-bold': bold }),
    lineHeight('!leading-5'),
    fontSize(small ? 'text-xs' : 'text-sm'),
    whitespace({ 'whitespace-nowrap': noWrap })
  )
export function BodyText({
  primary,
  bold,
  small,
  noWrap,
  center,
  children,
  inheritColor,
}: ChildrenProp & {
  primary?: boolean
  bold?: boolean
  small?: boolean
  noWrap?: boolean
  center?: boolean
  inheritColor?: boolean
}) {
  return (
    <p className={bodyText(primary, bold, small, noWrap, center, inheritColor)}>
      {children}
    </p>
  )
}

const headerText = (accent = false, center?: boolean, extraLeading = false) =>
  classnames(
    fontFamily('font-primary'),
    fontWeight('font-bold'),
    fontSize('text-2xl', 'xs:text-3xl', 'sm:text-4xl'),
    textColor(accent ? 'text-accent' : 'text-formal-accent'),
    extraLeading
      ? lineHeight('leading-9', 'sm:leading-10', 'md:leading-11')
      : lineHeight('!leading-8'),
    textAlign({ 'text-center': center })
  )
export function HeaderText({
  accent,
  center,
  extraLeading,
  children,
}: ChildrenProp & {
  accent?: boolean
  center?: boolean
  extraLeading?: boolean
}) {
  return (
    <h1 className={headerText(accent, center, extraLeading)}>{children}</h1>
  )
}

const loadingText = classnames(
  fontSize('text-xs', 'xs:text-sm'),
  lineHeight('!leading-5'),
  textAlign('text-center')
)
export function LoadingText({ children }: ChildrenProp) {
  return <h4 className={loadingText}>{children}</h4>
}

const cardTextContainer = classnames(
  fontFamily('font-primary'),
  lineHeight('leading-6')
)
export function CardParagraph({ children }: ChildrenProp) {
  return <p className={cardTextContainer}>{children}</p>
}

const statusText = (
  primary?: boolean,
  color?: 'accent' | 'primary' | 'error' | 'default',
  textRight?: boolean
) =>
  classnames(
    fontFamily({ 'font-primary': primary }),
    fontSize('text-xs'),
    lineHeight('leading-4'),
    textColor({
      'text-accent': color === 'accent',
      'text-primary': color === 'primary',
      'text-error': color === 'error',
      'text-formal-accent': color === 'default',
    }),
    textAlign({ 'text-right': textRight })
  )
export function StatusText({
  color = 'default',
  primary,
  textRight,
  children,
}: ChildrenProp & {
  primary?: boolean
  color?: 'accent' | 'primary' | 'error' | 'default'
  textRight?: boolean
}) {
  return (
    <span className={statusText(primary, color, textRight)}>{children}</span>
  )
}

const postText = classnames(
  fontFamily('font-primary'),
  fontSize('text-base'),
  lineHeight('leading-6'),
  whitespace('whitespace-pre-wrap')
)
export function PostText({ children }: ChildrenProp) {
  return <p className={postText}>{children}</p>
}
