interface BackgroundProps {
  width: number
  height: number
  background: string
  bottom: number
  left: number
  rotate?: number
  blur?: number
}

export default function ({
  width,
  height,
  background,
  bottom,
  left,
  rotate = 0,
  blur = 0,
}: BackgroundProps) {
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
        zIndex: -1,
      }}
    />
  )
}
