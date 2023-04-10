import ChildrenProp from 'models/ChildrenProp'
import classnames, { alignItems, display } from 'classnames/tailwind'

const commonClasses = classnames(display('flex'), alignItems('items-center'))

export default function ({
  children,
  url,
}: ChildrenProp & { url: string; small?: boolean }) {
  return (
    <a
      className={commonClasses}
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}
