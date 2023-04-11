import { cursor } from 'classnames/tailwind'

export default function ({ onClick }: { onClick: () => void }) {
  return (
    <div className={cursor('cursor-pointer')} onClick={onClick}>
      <svg
        height="16"
        viewBox="0 0 16 16"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 3L13 13" stroke="#EFECD6" stroke-width="2" />
        <path d="M13 3L3 13" stroke="#EFECD6" stroke-width="2" />
      </svg>
    </div>
  )
}
