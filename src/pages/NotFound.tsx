import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import Background from 'components/ui/Background'
import Button from 'components/ui/Button'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  alignItems,
  display,
  dropShadow,
  flexDirection,
  fontFamily,
  fontSize,
  fontWeight,
  gap,
  justifyContent,
  margin,
  position,
  textAlign,
  textColor,
  width,
} from 'classnames/tailwind'
import useSetAttribute from 'hooks/useSetAttribute'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  textAlign('text-center'),
  gap('gap-y-4')
)
const octoBlock = classnames(
  display('flex'),
  flexDirection('flex-col', 'xl:flex-row'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  gap('gap-x-40', 'gap-y-14')
)
const textStyles = classnames(width('w-fit', 'xl:w-max'), margin('mt-7'))
const strokeText = classNamesToString(
  classnames(
    textColor('text-transparent'),
    dropShadow('drop-shadow-secondary'),
    fontSize('text-8xl'),
    fontFamily('font-primary'),
    fontWeight('font-bold')
  ),
  'stroke-text-secondary'
)
const imageStyles = width('w-80', 'w-full')
const displayFromMd = display('hidden', 'xl:block')

function ReturnHomeButton() {
  return (
    <>
      <a href="/" className={displayTo('sm')}>
        <Button small type="primary">
          Self destruct and leave
        </Button>
      </a>
      <a href="/" className={displayFrom('sm')}>
        <Button type="primary">Self destruct and leave</Button>
      </a>
    </>
  )
}

function BackgroundBlur({ left }: { left?: boolean }) {
  if (left)
    return (
      <Background
        width={625}
        height={416}
        bottom={22}
        left={-4}
        rotate={-15}
        blur={150}
        background="var(--red-background)"
      />
    )

  return (
    <div className={displayFromMd}>
      <Background
        width={971}
        height={646}
        bottom={-400}
        left={-110}
        rotate={-30}
        blur={150}
        background="var(--red-background)"
      />
    </div>
  )
}

export default function () {
  document.title = '🐙 OCTOCORP'

  useSetAttribute('bg-theme', '404')

  return (
    <div className={container}>
      <div className={octoBlock}>
        <div className={displayFromMd}>
          <span className={strokeText}>404</span>
          <BackgroundBlur left />
        </div>
        <img className={imageStyles} src="img/octo404.webp" />
        <div className={position('relative')}>
          <span className={strokeText}>404</span>
          <BackgroundBlur />
        </div>
      </div>
      <span className={textStyles}>
        Initiate self-destruct sequence and return home to escape OCTOCORP!
      </span>
      <ReturnHomeButton />
    </div>
  )
}
