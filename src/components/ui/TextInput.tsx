import { HTMLAttributes } from 'preact/compat'
import classnames, {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  display,
  flexDirection,
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
    height('h-12')
  )

const inputContainer = (error?: boolean, disabled?: boolean) =>
  classnames(
    width('w-full'),
    padding('py-3', 'pl-6', 'pr-4'),
    backgroundColor('bg-transparent'),
    borderRadius('rounded-md'),
    outlineOffset('outline-2'),
    outlineStyle('outline-none'),
    outlineColor(error ? 'focus:outline-error-dark' : 'focus:outline-primary'),
    placeholderColor('placeholder-formal-accent-light-transparent'),
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

const atSign = (error?: boolean, disabled?: boolean, hasValue?: boolean) =>
  classnames(
    position('absolute'),
    inset('inset-y-3', 'left-3'),
    textColor({
      'text-formal-accent-semi-transparent': disabled,
      'text-error': error,

      'text-formal-accent': hasValue,
      'text-formal-accent-light-transparent': !hasValue,
    })
  )

export default function ({
  value,
  isError,
  disabled,
  withAtSign,
  ...rest
}: {
  value?: string
  isError?: boolean
  disabled?: boolean
  withAtSign?: boolean
} & HTMLAttributes<HTMLInputElement>) {
  const hasValue = (value && value.length > 0) || false

  return (
    <div className={groupContainer(isError, disabled)}>
      {withAtSign && (
        <span className={atSign(isError, disabled, hasValue)}>@</span>
      )}
      <input
        placeholder="username"
        value={value}
        disabled={disabled}
        className={inputContainer(isError, disabled)}
        {...rest}
      />
    </div>
  )
}
