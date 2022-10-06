import {
  classnames,
  dropShadow,
  stroke,
  strokeWidth,
} from 'classnames/tailwind'

const commonPath = classnames(
  stroke('stroke-secondary'),
  strokeWidth('stroke-1.5')
)
const bluePath = classnames(stroke('stroke-primary'), strokeWidth('stroke-1.5'))

export default function () {
  return (
    <svg
      width="58"
      height="58"
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={dropShadow('drop-shadow-secondary')}
    >
      <path
        d="M25.2308 1C11.5493 2.84919 1 14.6239 1 28.8737C1 44.4074 13.536 57 29 57C44.464 57 57 44.4074 57 28.8737C57 14.6239 46.4507 2.84919 32.7692 1"
        className={commonPath}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M36.0002 5.00073C46.2711 8.03467 53.7694 17.5748 53.7694 28.8742C53.7694 42.6156 42.6799 53.7552 29.0002 53.7552C15.3205 53.7552 4.23096 42.6156 4.23096 28.8742C4.23096 17.5748 11.7293 8.03467 22.0002 5.00073"
        className={commonPath}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M40.352 10.4835C46.4673 14.3005 50.5388 21.1095 50.5388 28.8738C50.5388 40.8228 40.8957 50.5094 29.0003 50.5094C17.1049 50.5094 7.46185 40.8228 7.46185 28.8738C7.46185 21.1095 11.5333 14.3005 17.6486 10.4835"
        className={commonPath}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.2751 16.7039C12.4236 19.9465 10.6932 24.2072 10.6932 28.8739C10.6932 39.0306 18.8898 47.2642 29.0009 47.2642C39.1119 47.2642 47.3086 39.0306 47.3086 28.8739C47.3086 24.2072 45.5781 19.9465 42.7266 16.7039"
        className={commonPath}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M29.5386 47.2399C35.8311 46.675 40.8463 36.3463 40.8463 29.9556C40.8463 23.3836 35.5426 17.7855 29.0001 17.7855C22.4577 17.7855 17.154 23.3836 17.154 29.9556C17.154 36.3463 22.1691 46.675 28.4617 47.2399"
        className={commonPath}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M27.9242 40.6727C27.0512 39.0836 25.0349 35.9054 23.9535 35.9054C22.6018 35.9054 22.0949 41.5927 27.9242 40.6727Z"
        className={bluePath}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M30.0777 40.6727C30.9507 39.0836 32.967 35.9054 34.0484 35.9054C35.4001 35.9054 35.907 41.5927 30.0777 40.6727Z"
        className={bluePath}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
