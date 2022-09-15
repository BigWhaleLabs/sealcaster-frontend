import { AccentText } from 'components/ui/Text'
import { HTMLAttributes } from 'preact/compat'
import CharInCircle from 'components/ui/CharInCircle'
import Sizes from 'models/MarkSizes'
import classnames, {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  display,
  flexDirection,
  gap,
  height,
  inset,
  outlineColor,
  outlineOffset,
  outlineStyle,
  padding,
  placeholderColor,
  position,
  textColor,
  width,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-2')
)

const groupContainer = (error?: boolean, disabled?: boolean) =>
  classnames(
    position('relative'),
    display('flex'),
    flexDirection('flex-row'),
    width('w-full'),
    backgroundColor(error ? 'bg-primary-dark-red' : 'bg-primary-dark'),
    borderColor(
      disabled
        ? error
          ? 'border-error-dark'
          : 'border-formal-accent-semi-transparent'
        : error
        ? 'border-error'
        : 'border-formal-accent'
    ),
    borderWidth('border'),
    borderRadius('rounded-md'),
    height('h-12'),
    textColor(
      disabled
        ? error
          ? 'text-error-semi-transparent'
          : 'text-formal-accent-semi-transparent'
        : error
        ? 'text-error'
        : 'text-formal-accent',
      'focus:text-formal-accent'
    )
  )

const inputContainer = (error?: boolean) =>
  classnames(
    width('w-full'),
    padding('py-3', 'pl-6', 'pr-4'),
    backgroundColor('bg-transparent'),
    borderRadius('rounded-md'),
    outlineOffset('outline-2'),
    outlineStyle('outline-none'),
    outlineColor(error ? 'focus:outline-error-dark' : 'focus:outline-primary'),
    placeholderColor('placeholder-formal-accent-light-transparent')
  )

const atSign = (noValue: boolean) =>
  classnames(
    position('absolute'),
    inset('inset-y-3', 'left-3'),
    textColor({ 'text-formal-accent-light-transparent': noValue })
  )

const errorWrapper = (visible: boolean) =>
  classnames(
    display(visible ? 'flex' : 'hidden'),
    alignItems('items-center'),
    gap('gap-x-2')
  )

export default function ({
  value,
  errorMessage,
  disabled,
  withAtSign,
  ...rest
}: {
  value?: string
  errorMessage?: string
  disabled?: boolean
  withAtSign?: boolean
} & HTMLAttributes<HTMLInputElement>) {
  const isError = !!errorMessage

  return (
    <div className={wrapper}>
      <div className={groupContainer(isError, disabled)}>
        {withAtSign && <span className={atSign(!value)}>@</span>}
        <input
          placeholder="username"
          value={value}
          disabled={disabled}
          className={inputContainer(isError)}
          {...rest}
        />
      </div>
      <div className={errorWrapper(isError)}>
        <CharInCircle size={Sizes.Small} char="!" />
        <AccentText small color="text-error">
          {errorMessage}
        </AccentText>
      </div>
    </div>
  )
}
