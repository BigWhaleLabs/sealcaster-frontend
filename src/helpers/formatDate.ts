import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default function (rawDate: number, from: number): string {
  return dayjs.unix(rawDate).from(from)
}
