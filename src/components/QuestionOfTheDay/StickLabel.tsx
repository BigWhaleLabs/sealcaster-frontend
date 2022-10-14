import { useRef, useState } from 'preact/hooks'
import QuestionOfTheDayLabel from 'icons/QuestionOfTheDayLabel'
import Tilt from 'react-parallax-tilt'
import classnames, { inset, position, transforms } from 'classnames/tailwind'

const badgeWrapper = classnames(
  position('absolute'),
  inset(
    '-right-2.5',
    'body:-right-12.5',
    'lg:!-right-25',
    'top-44',
    'sm:top-32',
    'lg:!-top-2.5'
  ),
  transforms('-rotate-15')
)

export default function () {
  const badge = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)

  return (
    <div className={badgeWrapper}>
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
          <QuestionOfTheDayLabel rotation={rotation} />
        </div>
      </Tilt>
    </div>
  )
}
