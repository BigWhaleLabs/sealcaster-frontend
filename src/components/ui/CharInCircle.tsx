import { forwardRef } from 'preact/compat'
import CharTypes from 'models/CharTypes'
import Sizes from 'models/MarkSizes'
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

const questionStyles = (size?: Sizes, disabled?: boolean) =>
  classnames(
    display('flex'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    fontSize({ 'text-xs': Sizes.Small === size }),
    fontFamily('font-primary'),
    cursor({ 'cursor-pointer': !disabled })
  )

const borderWrapper = (size?: Sizes) =>
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
    justifyContent('justify-center')
  )

const CharInCircle = forwardRef<
  HTMLDivElement,
  {
    size?: Sizes
    disabled?: boolean
    char: CharTypes
  }
>(({ size, disabled, char }, ref) => {
  return (
    <div ref={ref} className={borderWrapper(size)}>
      <div className={questionStyles(size, disabled)}>{char}</div>
    </div>
  )
})

export default CharInCircle
