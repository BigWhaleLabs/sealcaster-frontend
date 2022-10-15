import ChildrenProp from 'models/ChildrenProp'
import classnames, { alignItems, display } from 'classnames/tailwind'

const commonClasses = classnames(display('flex'), alignItems('items-center'))

export default function ({
  url,
  children,
}: ChildrenProp & { url: string; small?: boolean }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={commonClasses}
    >
      {children}
    </a>
  )
}
