export default function (element?: HTMLAnchorElement, position?: number) {
  if (!element) return

  const makePostPulse = () => {
    element.classList.toggle('animate-pulse')
    setTimeout(() => element.classList.toggle('animate-pulse'), 3000)
    return
  }
  if (!position) makePostPulse()

  const observer = new IntersectionObserver(() => makePostPulse(), {
    root: element,
    threshold: 1,
  })

  observer.observe(element)
}
