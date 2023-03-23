import { JSX, createRef } from 'react'
import { useState } from 'react'
import Arrow from 'icons/Arrow'
import Menu from 'components/Dropdown/Menu'
import Option from 'components/Dropdown/Option'
import classnames, {
  alignItems,
  backgroundClip,
  backgroundImage,
  display,
  fontSize,
  fontWeight,
  gap,
  gradientColorStops,
  justifyContent,
  margin,
  opacity,
  position,
  textColor,
  width,
} from 'classnames/tailwind'
import useClickOutside from 'hooks/useClickOutside'

const gradientText = classnames(
  textColor('text-transparent'),
  backgroundImage('bg-gradient-to-r'),
  backgroundClip('bg-clip-text'),
  gradientColorStops('from-secondary', 'to-accent'),
  fontWeight('font-bold')
)
const textStyles = (colorfulCurrentValue?: boolean) =>
  classnames(
    fontSize('text-sm'),
    colorfulCurrentValue ? gradientText : undefined
  )
const button = classnames(
  display('flex'),
  justifyContent('justify-start'),
  alignItems('items-center'),
  gap('gap-x-2'),
  opacity('disabled:opacity-30')
)
const container = classnames(position('relative'), margin('my-2'))

export default function ({
  colorfulCurrentValue,
  currentValue,
  disabled,
  extraSpacing,
  fitToItemSize,
  onChange,
  options,
  staticPlaceholder,
  withArrow,
}: {
  currentValue: string
  options: Option[]
  onChange: (selectedValue: string) => void
  disabled?: boolean
  staticPlaceholder?: string | JSX.Element
  fitToItemSize?: boolean
  colorfulCurrentValue?: boolean
  extraSpacing?: boolean
  withArrow?: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = createRef<HTMLDivElement>()

  useClickOutside(ref, () => setOpen(false))

  const selectedElement = (
    <button
      className={button}
      disabled={disabled}
      onClick={() => options.length && setOpen(!open)}
    >
      <span className={textStyles(colorfulCurrentValue)}>
        {staticPlaceholder || currentValue}
      </span>
      {withArrow && (
        <div className={width('w-4')}>
          <Arrow pulseDisabled open={open} />
        </div>
      )}
    </button>
  )

  return (
    <div className={container} ref={ref}>
      {selectedElement}
      <Menu
        extraSpacing={extraSpacing}
        fitToItemSize={fitToItemSize}
        open={open}
        options={options}
        selected={currentValue}
        onSelect={({ label, value }) => {
          onChange(value || label)
          setOpen(false)
        }}
      />
    </div>
  )
}
