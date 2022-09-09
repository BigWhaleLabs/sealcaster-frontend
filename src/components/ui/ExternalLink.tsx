import { Link } from 'wouter'
import ChildrenProp from 'models/ChildrenProp'

export default function ({ url, children }: ChildrenProp & { url: string }) {
  return <Link href={url}>{children}</Link>
}
