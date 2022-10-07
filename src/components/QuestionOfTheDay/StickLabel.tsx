import { useRef, useState } from 'preact/hooks'
import QuestionOfTheDayLabel from 'icons/QuestionOfTheDayLabel'
import Tilt from 'react-parallax-tilt'
import classnames, {
  dropShadow,
  inset,
  position,
  transforms,
} from 'classnames/tailwind'

const badgeWrapper = (mobile?: boolean) =>
  classnames(
    position('absolute'),
    inset(
      'xs:-right-2.5',
      mobile ? 'body:-right-12.5' : 'body:-right-25',
      mobile ? '-bottom-27.5' : '-top-2.5'
    ),
    transforms('-rotate-15')
  )

export default function ({ mobile }: { mobile?: boolean }) {
  const badge = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)

  return (
    <div className={badgeWrapper(mobile)}>
      <Tilt
        glareEnable
        glareMaxOpacity={0.4}
        glareBorderRadius="100%"
        tiltReverse
        perspective={500}
        onMove={({ tiltAngleX, tiltAngleY }) => {
          if (!badge.current) return
          badge.current.style.filter =
            'drop-shadow(0px 0px 2.125rem var(--accent-light-transparent)'
          setRotation(tiltAngleX + tiltAngleY)
        }}
      >
        <div ref={badge}>
          <QuestionOfTheDayLabel mobile={mobile} rotation={rotation} />
        </div>
      </Tilt>
    </div>
  )
}
