import { Link } from 'wouter'
import {
  TDropShadow,
  TGradientColorStops,
  TTextColor,
  alignItems,
  backgroundClip,
  backgroundImage,
  caretColor,
  classnames,
  display,
  dropShadow,
  fontFamily,
  fontSize,
  fontWeight,
  gradientColorStops,
  lineHeight,
  margin,
  placeholderColor,
  space,
  textAlign,
  textColor,
  textDecoration,
  transitionProperty,
  whitespace,
  width,
  wordBreak,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'
import ExclamationInCircle from 'icons/ExclamationInCircle'
import checkIsLinkActive from 'helpers/checkIsLinkActive'
import classNamesToString from 'helpers/classNamesToString'

const accentText = (
  color: TTextColor,
  bold?: boolean,
  small?: boolean,
  primary?: boolean,
  shadow?: TDropShadow,
  extraSmall?: boolean,
  large?: boolean
) =>
  classnames(
    textColor(
      color === 'text-primary-semi-dimmed'
        ? { 'selection:text-primary': true, 'text-primary-semi-dimmed': true }
        : color
    ),
    fontFamily(primary ? 'font-primary' : undefined),
    fontWeight(bold ? 'font-bold' : 'font-normal'),
    fontSize({
      'text-lg': large,
      'text-sm': small,
      'text-xs': extraSmall,
    }),
    dropShadow(shadow)
  )
export function AccentText({
  bold,
  children,
  color,
  extraSmall,
  large,
  primary,
  shadow,
  small,
}: ChildrenProp & {
  color: TTextColor
  bold?: boolean
  small?: boolean
  primary?: boolean
  shadow?: TDropShadow
  extraSmall?: boolean
  large?: boolean
}) {
  return (
    <span
      className={accentText(
        color,
        bold,
        small,
        primary,
        shadow,
        extraSmall,
        large
      )}
    >
      {children}
    </span>
  )
}

const gradientText = classnames(
  textColor('text-transparent', 'hover:text-accent', 'active:text-secondary'),
  backgroundImage('bg-gradient-to-r'),
  backgroundClip('bg-clip-text'),
  gradientColorStops('from-secondary', 'to-accent'),
  fontWeight('font-bold'),
  fontFamily('font-primary')
)
export function GradientText({ children }: ChildrenProp) {
  return <span className={gradientText}>{children}</span>
}

const linkText = (
  small?: boolean,
  extraSmall?: boolean,
  bold?: boolean,
  gradientFrom?: TGradientColorStops,
  gradientTo?: TGradientColorStops,
  underline?: boolean,
  primary?: boolean
) =>
  classnames(
    textDecoration({ underline }),
    fontFamily({ 'font-primary': primary }),
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
  bold,
  children,
  extraSmall,
  gradientFrom,
  gradientTo,
  internal,
  primary,
  small,
  title,
  underline,
  url,
}: ChildrenProp & {
  url: string
  small?: boolean
  extraSmall?: boolean
  internal?: boolean
  bold?: boolean
  title?: string
  gradientFrom?: TGradientColorStops
  gradientTo?: TGradientColorStops
  underline?: boolean
  primary?: boolean
}) {
  const linkClassnames = linkText(
    small,
    extraSmall,
    bold,
    gradientFrom,
    gradientTo,
    underline,
    primary
  )

  if (internal)
    return (
      <Link className={linkClassnames} href={url}>
        {children}
      </Link>
    )

  return (
    <a
      className={linkClassnames}
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      title={title}
    >
      {children}
    </a>
  )
}

interface BodyTextProps {
  primary?: boolean
  bold?: boolean
  semiBold?: boolean
  small?: boolean
  large?: boolean
  noWrap?: boolean
  preWrap?: boolean
  center?: boolean
  inheritColor?: boolean
}
const bodyText = ({
  bold,
  center,
  inheritColor,
  large,
  noWrap,
  preWrap,
  primary,
  semiBold,
  small,
}: BodyTextProps) =>
  classnames(
    fontFamily({ 'font-primary': primary }),
    textColor(inheritColor ? 'text-inherit' : 'text-formal-accent'),
    textAlign({ 'text-center': center }),
    fontWeight({ 'font-bold': bold, 'font-semibold': semiBold }),
    lineHeight('!leading-5'),
    fontSize({ 'text-sm': !large, 'text-xs': small }),
    whitespace({ 'whitespace-nowrap': noWrap, 'whitespace-pre-wrap': preWrap })
  )
export function BodyText({
  bold,
  center,
  children,
  inheritColor,
  large,
  noWrap,
  preWrap,
  primary,
  semiBold,
  small,
}: ChildrenProp & BodyTextProps) {
  return (
    <p
      className={bodyText({
        bold,
        center,
        inheritColor,
        large,
        noWrap,
        preWrap,
        primary,
        semiBold,
        small,
      })}
    >
      {children}
    </p>
  )
}

const headerText = (
  accent = false,
  center?: boolean,
  extraLeading = false,
  size = 'medium'
) =>
  classnames(
    fontFamily('font-primary'),
    fontWeight('font-bold'),
    fontSize(
      {
        'text-2xl': size === 'medium',
        'text-3.5xl': size === 'large',
        'text-xl': size === 'small',
      },
      size === 'small' ? 'xs:text-2xl' : 'xs:text-3.5xl'
    ),
    textColor(accent ? 'text-accent' : 'text-formal-accent'),
    extraLeading
      ? lineHeight('leading-10', 'md:leading-10.5')
      : lineHeight({ '!leading-8': size !== 'small' }),
    textAlign({ 'text-center': center })
  )
export function HeaderText({
  accent,
  center,
  children,
  extraLeading,
  size,
}: ChildrenProp & {
  accent?: boolean
  center?: boolean
  extraLeading?: boolean
  size?: 'large' | 'medium' | 'small'
}) {
  return (
    <h1 className={headerText(accent, center, extraLeading, size)}>
      {children}
    </h1>
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
  color?: 'accent' | 'primary' | 'error' | 'dimmed' | 'default' | 'tertiary',
  textRight?: boolean
) =>
  classnames(
    fontFamily({ 'font-primary': primary }),
    fontSize('text-xs'),
    lineHeight('leading-4'),
    textColor({
      'text-accent': color === 'accent',
      'text-error': color === 'error',
      'text-formal-accent': color === 'default',
      'text-primary': color === 'primary',
      'text-primary-dimmed': color === 'dimmed',
      'text-tertiary': color === 'tertiary',
    }),
    textAlign({ 'text-right': textRight })
  )
export function StatusText({
  children,
  color = 'default',
  primary,
  textRight,
}: ChildrenProp & {
  primary?: boolean
  color?: 'accent' | 'primary' | 'error' | 'dimmed' | 'default' | 'tertiary'
  textRight?: boolean
}) {
  return (
    <span className={statusText(primary, color, textRight)}>{children}</span>
  )
}

const postText = (small?: boolean) =>
  classNamesToString(
    fontFamily('font-primary'),
    fontSize({ 'text-sm': small }),
    lineHeight(small ? 'leading-5' : 'leading-6'),
    whitespace('whitespace-pre-wrap'),
    'break-words'
  )
export function PostText({
  children,
  small,
}: ChildrenProp & { small?: boolean }) {
  return <p className={postText(small)}>{children}</p>
}

const footerLink = (active?: boolean) =>
  classnames(
    fontSize('text-sm'),
    fontWeight('font-semibold'),
    textDecoration({ 'hover:underline': true, underline: active }),
    textColor({ 'hover:text-accent': true, 'text-accent': active }),
    transitionProperty('transition-colors')
  )
export function FooterLink({
  children,
  internal,
  url,
}: ChildrenProp & { url: string; internal?: boolean }) {
  if (internal) {
    const isActive = checkIsLinkActive(url)

    return (
      <Link className={footerLink(isActive)} href={url}>
        {children}
      </Link>
    )
  }

  return (
    <a
      className={footerLink()}
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}

const cardSubheaderContainer = classnames(
  fontWeight('font-bold'),
  fontFamily('font-primary'),
  fontSize('text-lg'),
  lineHeight('leading-7')
)
export function CardSubheader({ children }: ChildrenProp) {
  return <p className={cardSubheaderContainer}>{children}</p>
}

const subHeader = (primary?: boolean, small?: boolean) =>
  classnames(
    fontFamily({ 'font-primary': !primary }),
    fontSize({ 'text-sm': small })
  )

export function SubHeaderText({
  children,
  primary,
  small,
}: ChildrenProp & { primary?: boolean; small?: boolean }) {
  return <p className={subHeader(primary, small)}>{children}</p>
}

const logoText = classnames(
  textColor('text-accent'),
  fontWeight('font-bold'),
  fontSize('text-sm', 'xs:text-lg'),
  lineHeight('leading-none')
)
export function LogoText({ children }: ChildrenProp) {
  return <span className={logoText}>{children}</span>
}
const logoSubText = classnames(
  textColor('text-primary-semi-dimmed', 'selection:text-primary'),
  fontWeight('font-bold'),
  fontSize('text-xs')
)
export function LogoSubText({ children }: ChildrenProp) {
  return <span className={logoSubText}>{children}</span>
}

const socialLink = classnames(
  lineHeight('leading-6'),
  fontSize('text-base'),
  textDecoration('no-underline', 'active:underline'),
  textColor('hover:text-tertiary', 'text-formal-accent')
)
export function SocialLink({ children, url }: ChildrenProp & { url: string }) {
  return (
    <a
      className={classNamesToString(socialLink, 'hover-tertiary')}
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}

const textareaText = (dark?: boolean) =>
  classnames(
    display('flex'),
    fontFamily('font-primary'),
    alignItems('items-center'),
    textColor({
      'text-formal-accent': !dark,
      'text-formal-accent-semi-transparent': dark,
    }),
    placeholderColor('placeholder-formal-accent-dimmed'),
    caretColor('caret-primary')
  )
export function TextareaText({
  children,
  dark,
}: ChildrenProp & { dark?: boolean }) {
  return <div className={textareaText(dark)}>{children}</div>
}

const errorTextBox = (visible?: boolean) =>
  classnames(
    display(visible ? 'flex' : 'hidden'),
    alignItems('items-start'),
    space('space-x-2')
  )
const errorText = (centered?: boolean, small?: boolean) =>
  classnames(
    textColor('text-error'),
    fontWeight('font-medium'),
    fontFamily('font-primary'),
    fontSize({
      'text-sm': small,
    }),
    textAlign({ 'text-center': centered })
  )
const exclamation = margin('mt-1.5')
export function ErrorText({
  centered,
  children,
  small,
  visible,
  withExclamation,
}: ChildrenProp & {
  centered?: boolean
  small?: boolean
  withExclamation?: boolean
  visible?: boolean
}) {
  const error = <p className={errorText(centered, small)}>{children}</p>

  if (withExclamation)
    return (
      <div className={errorTextBox(visible)}>
        <div className={exclamation}>
          <ExclamationInCircle />
        </div>
        {error}
      </div>
    )

  return error
}

const suffixText = classnames(
  fontSize('text-sm'),
  lineHeight('leading-5'),
  textColor('text-formal-accent-semi-transparent'),
  wordBreak('break-all')
)
export function SuffixText({ children }: ChildrenProp) {
  return <span className={suffixText}>{children}</span>
}

export const highlightedText = (bold?: boolean, center?: boolean) =>
  classnames(
    width('w-fit'),
    textColor('text-primary-dark'),
    fontWeight(bold ? 'font-bold' : 'font-semibold'),
    fontFamily({ 'font-primary': bold }),
    fontSize({ 'text-sm': bold }),
    lineHeight(bold ? 'leading-6' : 'leading-5'),
    textAlign({ 'text-center': center })
  )
export function HighlightedText({
  bold,
  center,
  children,
}: ChildrenProp & {
  bold?: boolean
  center?: boolean
}) {
  return <div className={highlightedText(bold, center)}>{children}</div>
}

const trashButtonText = classnames(
  textColor('text-secondary', 'active:text-secondary-light-transparent'),
  fontSize('text-xs'),
  textDecoration('underline'),
  fontWeight('font-normal')
)
export function TrashButtonText({ children }: ChildrenProp) {
  return (
    <span className={classNamesToString(trashButtonText, 'hover-secondary')}>
      {children}
    </span>
  )
}

const largeText = classnames(
  fontFamily('font-primary'),
  fontWeight('font-bold'),
  fontSize('text-lg', 'sm:text-xl', 'md:text-2xl'),
  textAlign('text-center')
)
export function LargeText({ children }: ChildrenProp) {
  return <h2 className={largeText}>{children}</h2>
}

const questionOfDayText = classnames(
  fontFamily('font-primary'),
  fontWeight('font-bold')
)
const questionOfDayTextColor = classnames(
  backgroundImage('bg-gradient-to-r'),
  textColor('text-transparent'),
  backgroundClip('bg-clip-text'),
  gradientColorStops('from-tertiary', 'to-primary-bright')
)

export function QuestionOfDayText({ children }: ChildrenProp) {
  return (
    <span className={questionOfDayText}>
      <span className={questionOfDayTextColor}>{children}</span>
    </span>
  )
}

const questionOfDayPostText = classnames(
  fontFamily('font-primary'),
  fontWeight('font-bold'),
  fontSize('text-2xl'),
  lineHeight('!leading-8'),
  whitespace('whitespace-pre-wrap')
)
export function QuestionOfDayPostText({ children }: ChildrenProp) {
  return <h1 className={questionOfDayPostText}>{children}</h1>
}

const cookieText = classnames(
  textColor('text-formal-accent'),
  fontFamily('font-primary'),
  fontSize('text-base', 'sm:text-lg'),
  fontWeight('font-bold'),
  lineHeight('leading-6')
)
export function CookieText({ children }: ChildrenProp) {
  return <p className={cookieText}>{children}</p>
}
