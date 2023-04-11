export default function () {
  const [hash, externalId] = window.location.hash
    .substring(2)
    .replace('%23', '#')
    .split('?id=')

  const [path, anchor] = hash.split('#')

  return {
    anchor,
    externalId,
    path,
  }
}
