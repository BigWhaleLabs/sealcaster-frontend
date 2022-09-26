import {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  boxShadowColor,
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

const cardContainer = (small?: boolean, blueBg?: boolean) => {
  return classnames(
    position('relative'),
    borderWidth(blueBg ? 'border-0' : 'border'),
    borderColor('border-half-grey'),
    borderRadius('rounded-2xl'),
    boxShadow('shadow-inner'),
    boxShadowColor('shadow-light-formal-accent'),
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
}

export default function ({
  children,
  small,
  blueBg,
}: ChildrenProp & { small?: boolean; blueBg?: boolean }) {
  return <div className={cardContainer(small, blueBg)}>{children}</div>
}
