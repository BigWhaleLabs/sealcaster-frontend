import { CharTypes, Sizes } from 'models/CharInCircle'
import classnames, {
  alignItems,
  borderColor,
  borderRadius,
  borderWidth,
  boxSizing,
  cursor,
  display,
  fontFamily,
  fontSize,
  height,
  justifyContent,
  width,
} from 'classnames/tailwind'

const questionStyles = (size?: Sizes) =>
  classnames(
    display('flex'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    fontSize({ 'text-xs': Sizes.Small === size }),
    fontFamily('font-primary')
  )

const borderWrapper = (size?: Sizes, disabled?: boolean) =>
  classnames(
    boxSizing('box-border'),
    borderRadius('rounded-full'),
    borderWidth('border'),
    borderColor('border-current'),
    width({
      'w-4': size === Sizes.Small,
      'w-5': size === Sizes.Medium,
      'w-6': !size,
    }),
    height({
      'h-4': size === Sizes.Small,
      'h-5': size === Sizes.Medium,
      'h-6': !size,
    }),
    display('flex'),
    justifyContent('justify-center'),
    cursor({ 'cursor-pointer': !disabled })
  )

export default function ({
  size,
  disabled,
  char,
}: {
  size?: Sizes
  disabled?: boolean
  char: CharTypes
}) {
  return (
    <div className={borderWrapper(size, disabled)}>
      <div className={questionStyles(size)}>{char}</div>
    </div>
  )
}
