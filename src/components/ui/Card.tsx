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

const cardContainer = (small?: boolean) => {
  return classnames(
    position('relative'),
    borderWidth('border'),
    borderColor('border-half-grey'),
    borderRadius('rounded-2xl'),
    backgroundColor('bg-primary-dark'),
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
}: ChildrenProp & { small?: boolean }) {
  return <div className={cardContainer(small)}>{children}</div>
}
