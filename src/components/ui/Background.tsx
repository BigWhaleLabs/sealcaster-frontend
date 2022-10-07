export default function ({
  width,
  height,
  background,
  bottom,
  left,
  rotate = 0,
  reversedAppear,
  inView,
  blur = 0,
}: {
  width: number
  height: number
  background: string
  bottom: number
  left: number
  rotate?: number
  reversedAppear?: boolean
  inView?: boolean
  blur?: number
}) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: `${bottom}%`,
        left: `${left}%`,
        width: `${width}px`,
        height: `${height}px`,
        background: `radial-gradient(50% 50% at 50% 50%, ${background} 0%, ${background}00 100%)`,
        rotate: `${rotate}deg`,
        borderRadius: '100%',
        filter: `blur(${blur}px)`,
        opacity: reversedAppear ? (inView ? 0 : 0.6) : inView ? 0.6 : 0,
        transitionDuration: '4s',
        transitionProperty: 'opacity',
        zIndex: -1,
      }}
    />
  )
}
