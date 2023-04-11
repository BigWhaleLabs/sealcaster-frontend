import {
  animation,
  classnames,
  height,
  inset,
  position,
  textColor,
  width,
} from 'classnames/tailwind'

const icon = (small?: boolean, screenCentre?: boolean) =>
  classnames(
    animation('animate-spin'),
    textColor('text-inherit'),
    width(small ? 'w-3' : 'w-5'),
    height(small ? 'h-3' : 'h-5'),
    inset({ 'left-1/2': screenCentre, 'top-1/2': screenCentre }),
    position({ absolute: screenCentre })
  )

interface LoadingProps {
  screenCentre?: boolean
  small?: boolean
}

export default function ({ screenCentre, small }: LoadingProps) {
  return (
    <svg className={icon(small, screenCentre)} viewBox="0 0 24 24">
      <path
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      />
    </svg>
  )
}
