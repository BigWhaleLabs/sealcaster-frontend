export default function () {
  const url = window.location.href
  const regExId = /id=(\d+)/

  const matchId = url.match(regExId)

  return matchId ? matchId[1] : undefined
}
