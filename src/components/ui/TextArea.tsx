import { ChangeEvent } from 'preact/compat'
import { ErrorText, TextareaText } from 'components/ui/Text'
import {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  classnames,
  display,
  flexDirection,
  flexGrow,
  justifyContent,
  outlineColor,
  outlineStyle,
  padding,
  resize,
  space,
  transitionProperty,
  width,
} from 'classnames/tailwind'
import { parseErrorText } from '@big-whale-labs/frontend-utils'
import SuffixBlock from 'components/ui/SuffixBlock'
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize'

const containerWithFooter = classnames(
  display('flex'),
  flexDirection('flex-col', 'md:flex-row'),
  alignItems('items-stretch', 'md:items-start'),
  space('space-y-2', 'md:space-x-2', 'md:space-y-0')
)
const innerWrapper = (isValid?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    flexGrow('grow'),
    alignItems('items-stretch'),
    justifyContent('justify-between'),
    borderWidth('border'),
    borderColor(
      isValid ? 'border-formal-accent-dimmed' : 'border-error',
      'focus-within:border-formal-accent'
    ),
    outlineColor('focus-within:outline-primary'),
    outlineStyle('focus-within:outline'),
    borderRadius('rounded-lg'),
    padding('py-3', 'px-4'),
    transitionProperty('transition-colors'),
    backgroundColor('bg-primary-dark')
  )
const textWithErrorWrapper = classnames(space('space-y-4'))

const textBox = classnames(
  backgroundColor('bg-primary-dark'),
  resize('resize-none'),
  width('w-full'),
  transitionProperty('transition-colors'),
  outlineStyle('outline-none', 'focus:outline-none')
)

interface TextAreaProps {
  text: string
  onTextChange: (text: string) => void
  maxLength: number
  disabled?: boolean
  error?: unknown
  footer?: string
}

export default function ({
  text,
  onTextChange,
  disabled,
  error,
  maxLength,
  ...restProps
}: TextAreaProps & TextareaAutosizeProps) {
  const isValid = !error && text.length <= maxLength

  return (
    <div className={textWithErrorWrapper}>
      <div className={containerWithFooter}>
        <div className={innerWrapper(isValid)}>
          <TextareaText dark={disabled}>
            <TextareaAutosize
              className={textBox}
              value={text}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                onTextChange(event.currentTarget.value)
              }}
              disabled={disabled}
              maxLength={maxLength}
              minRows={3}
              spellcheck={true}
              {...restProps}
            />
          </TextareaText>
          <SuffixBlock maxCount={maxLength} text={text} />
        </div>
      </div>
      <ErrorText visible={!!error} withExclamation>
        {parseErrorText(error)}
      </ErrorText>
    </div>
  )
}
