import { HTMLAttributes } from 'preact/compat'
import classnames, {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  display,
  flexDirection,
  height,
  outlineColor,
  outlineOffset,
  outlineStyle,
  padding,
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

const inputContainer = (
  hasIcon?: boolean,
  error?: boolean,
  disabled?: boolean
) =>
  classnames(
    width('w-full'),
    padding('pl-10'),
    backgroundColor('bg-transparent'),
    borderRadius('rounded-md'),
    outlineOffset('outline-2'),
    outlineStyle('outline-none'),
    outlineColor(error ? 'focus:outline-error-dark' : 'focus:outline-primary'),
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

export default function ({
  disabled,
  isError,
  value,
  ...rest
}: {
  value?: string
  isError?: boolean
  disabled?: boolean
} & HTMLAttributes<HTMLInputElement>) {
  return (
    <div className={groupContainer(isError, disabled)}>
      <input
        className={inputContainer(isError, disabled)}
        disabled={disabled}
        value={value}
        {...rest}
      />
    </div>
  )
}
