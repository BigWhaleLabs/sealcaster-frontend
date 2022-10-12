import { dropShadow } from 'classnames/tailwind'

export default function () {
  const size = { w: 116, h: 95 }

  return (
    <svg
      width={size.w}
      height={size.h}
      viewBox="0 0 116 95"
      xmlns="http://www.w3.org/2000/svg"
      className={dropShadow('drop-shadow-formal-accent')}
    >
      <clipPath id="rounded_triangle">
        <path d="M0.714642 85.9158L51.586 2.59194C53.1454 0.0377262 56.8546 0.0377171 58.414 2.59193L109.285 85.9158C110.913 88.5813 108.994 92.0002 105.871 92.0002H4.12866C1.00571 92.0002 -0.912686 88.5813 0.714642 85.9158Z" />
      </clipPath>
      <foreignObject
        width={size.w}
        height={size.h}
        clip-path="url(#rounded_triangle)"
      >
        <div
          style={{
            background:
              'conic-gradient(from 180deg at 50% 50%, #000000 0deg, rgba(255, 255, 255, 0.72) 17deg, #000000 88deg, rgba(255, 255, 255, 0.72) 152deg, #000000 225deg, rgba(255, 255, 255, 0.72) 289deg, #000000 360deg), conic-gradient(from 180deg at 50% 50%, #000000 0deg, #FFFFFF 30deg, #000000 96deg, #FFFFFF 168.75deg, #000000 229deg, #FFFFFF 285deg, #000000 360deg), radial-gradient(79.79% 80.25% at 10.11% 28.24%, #F86EFB 7.61%, #7342FF 35.14%, #42E8FF 63.45%, #42FF6B 100%)',
            backgroundBlendMode: 'screen, difference, normal',
            width: size.w,
            height: size.h,
            filter: 'brightness(1.15) saturate(2)',
          }}
        />
      </foreignObject>

      <svg x="-2">
        <path
          d="M81.2619 49.4648C81.2619 53.8854 77.7783 57.469 73.481 57.469C69.1838 57.469 65.7002 53.8854 65.7002 49.4648C65.7002 45.0441 69.1838 49.4647 73.481 49.4647C77.7783 49.4647 81.2619 45.0441 81.2619 49.4648Z"
          fill="#FED823"
          stroke="#0D0030"
          stroke-width="3"
        />
        <path
          d="M58.1764 70.0856C61.0842 70.0856 63.4414 70.4345 63.4414 67.096C63.4414 63.7575 61.0842 61.0511 58.1764 61.0511C55.2686 61.0511 52.9113 63.7575 52.9113 67.096C52.9113 70.4345 55.2686 70.0856 58.1764 70.0856ZM58.1764 70.0856C58.1764 72.0933 58.1764 76.5603 58.1764 78.3672M58.1764 78.3672C58.1764 84.3903 67.8516 79.1657 67.8516 85.4986M58.1764 78.3672C58.1764 84.3902 48.8697 78.3672 48.8697 85.499"
          stroke="#0D0030"
          stroke-width="3"
        />
        <path
          d="M51.1828 49.4657C51.1828 53.8864 47.6992 57.47 43.4019 57.47C39.1047 57.47 35.6211 53.8864 35.6211 49.4657C35.6211 45.0451 39.1047 49.4656 43.4019 49.4656C47.6992 49.4656 51.1828 45.0451 51.1828 49.4657Z"
          fill="#FED823"
          stroke="#0D0030"
          stroke-width="3"
        />
        <path
          d="M82.2465 70.0879L73.2207 71.5936"
          stroke="#0D0030"
          stroke-width="3"
        />
        <path
          d="M73.2242 76.1094L82.25 77.6151"
          stroke="#0D0030"
          stroke-width="3"
        />
        <path
          d="M34.109 70.0869L43.1348 71.5927"
          stroke="#0D0030"
          stroke-width="3"
        />
        <path
          d="M43.1351 76.1113L34.1094 77.6171"
          stroke="#0D0030"
          stroke-width="3"
        />
      </svg>
    </svg>
  )
}
