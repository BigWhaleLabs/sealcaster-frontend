import { TTailwindString } from 'classnames/tailwind'

type AllowedExtraClassnames =
  | 'hover-tertiary'
  | 'hover-secondary'
  | 'double-gradient-shadow'
  | 'loading-pause'
  | 'dots-loading'

export default function (
  ...classNames: (AllowedExtraClassnames | TTailwindString | undefined | null)[]
): string {
  return classNames.filter((s) => !!s).join(' ')
}
