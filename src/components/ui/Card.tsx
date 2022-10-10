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
  width,
  wordBreak,
  zIndex,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'
import classNamesToString from 'helpers/classNamesToString'

const cardContainer = (small?: boolean, blueBg?: boolean) => {
  const card = classnames(
    position('relative'),
    borderWidth(blueBg ? 'border-0' : 'border'),
    borderColor('border-half-grey'),
    borderRadius('rounded-2xl'),
    backgroundColor(blueBg ? 'bg-primary-background' : 'bg-primary-dark'),
    padding(small ? 'p-4' : 'p-6'),
    maxWidth('max-w-full'),
    maxHeight('max-h-full'),
    height('h-fit'),
    width('w-full'),
    space('space-y-4'),
    wordBreak('break-words'),
    zIndex('z-20')
  )
  // added via css because tailwind class overwrites by material-ui
  return classNamesToString(card, 'shadow-card', 'gradient-beauty')
}

export default function ({
  children,
  small,
  blueBg,
}: ChildrenProp & { small?: boolean; blueBg?: boolean }) {
  return <div className={cardContainer(small, blueBg)}>{children}</div>
}
