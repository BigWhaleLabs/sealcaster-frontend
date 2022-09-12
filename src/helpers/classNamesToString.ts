import { TTailwindString } from 'classnames/tailwind'

type AllowedExtraClassnames = 'hover-tertiary' | 'double-gradient-shadow'

export default function (
  ...classNames: (AllowedExtraClassnames | TTailwindString | undefined | null)[]
): string {
  return classNames.filter((s) => !!s).join(' ')
}
