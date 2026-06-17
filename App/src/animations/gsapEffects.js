import gsap from 'gsap'

const fadeUp = {
  y: 40,
  opacity: 0,
  ease: 'power3.out',
}

/** Header: slide in once on load */
export function animateHeader(scope) {
  const logo = scope.querySelector('.logo')
  const links = scope.querySelectorAll('.headerLink')

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from(scope, { y: -20, opacity: 0, duration: 0.5 })
    .from(logo, { x: -20, opacity: 0, duration: 0.45 }, '-=0.25')
    .from(
      links,
      { y: -12, opacity: 0, duration: 0.4, stagger: 0.07 },
      '-=0.2'
    )
}

/** Home: hero sequence */
export function animateHomeHero(scope) {
  const hero = scope.querySelector('.heroCard')
  const title = scope.querySelector('.pageTitle')
  const subtitle = scope.querySelector('.subTitle')
  if (!hero) return

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from(hero, { ...fadeUp, scale: 0.97, duration: 0.7 })
  if (title) tl.from(title, { y: 24, opacity: 0, duration: 0.55 }, '-=0.35')
  if (subtitle) tl.from(subtitle, { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
}

export function animatePostCards(scope) {
  const cards = scope.querySelectorAll('.postGrid .postCard')
  if (!cards.length) return
  gsap.from(cards, {
    ...fadeUp,
    scale: 0.95,
    stagger: 0.1,
    duration: 0.65,
  })
}

/** Hover lift on cards — returns cleanup */
export function attachCardHover(cards) {
  const cleanups = []

  cards.forEach((card) => {
    const onEnter = () => {
      gsap.to(card, { y: -6, duration: 0.25, ease: 'power2.out' })
    }
    const onLeave = () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' })
    }
    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mouseleave', onLeave)
    cleanups.push(() => {
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mouseleave', onLeave)
    })
  })

  return () => cleanups.forEach((fn) => fn())
}

/** Blog detail: article + inner content */
export function animateBlogDetail(scope) {
  const article = scope.querySelector('.postCard')
  const title = scope.querySelector('.postTitle')
  const excerpt = scope.querySelector('.postExcerpt1')
  const date = scope.querySelector('.postDate')
  if (!article) return

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from(article, { ...fadeUp, y: 32, duration: 0.65 })
  if (title) tl.from(title, { y: 20, opacity: 0, duration: 0.5 }, '-=0.35')
  if (excerpt) tl.from(excerpt, { y: 16, opacity: 0, duration: 0.55 }, '-=0.25')
  if (date) tl.from(date, { opacity: 0, x: -12, duration: 0.4 }, '-=0.2')
}

/** About / Contact */
export function animatePageContent(scope) {
  const content = scope.querySelector('.subTitle')
  if (!content) return

  gsap.from(content, {
    y: 36,
    opacity: 0,
    scale: 0.98,
    duration: 0.75,
    ease: 'power3.out',
  })
}

/** Author: panel + form fields */
export function animateAuthorSurface(scope) {
  const surface = scope.querySelector('.authorSurface')
  const title = scope.querySelector('.authorTitle')
  const sub = scope.querySelector('.authorSubTitle')
  const fields = scope.querySelectorAll('.authorField')
  if (!surface) return

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from(surface, { ...fadeUp, y: 28, duration: 0.65 })
  if (title) tl.from(title, { y: 20, opacity: 0, duration: 0.5 }, '-=0.4')
  if (sub) tl.from(sub, { y: 16, opacity: 0, duration: 0.45 }, '-=0.3')
  if (fields.length) {
    tl.from(fields, { x: -16, opacity: 0, duration: 0.45, stagger: 0.1 }, '-=0.2')
  }
}

export function animateAuthorCards(scope) {
  const cards = scope.querySelectorAll('.authorCard')
  if (!cards.length) return
  gsap.from(cards, {
    ...fadeUp,
    y: 28,
    stagger: 0.08,
    duration: 0.55,
  })
}
