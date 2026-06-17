import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { animateHeader } from '../animations/gsapEffects'

function Header() {
  const headerRef = useRef(null)

  useGSAP(
    () => {
      if (headerRef.current) animateHeader(headerRef.current)
    },
    { scope: headerRef }
  )

  return (
    <header className="siteHeader" ref={headerRef}>
      <div className="container headerInner">
        <div className="logo">My Blog</div>
        <nav className="headerNav" aria-label="Primary">
          <Link to="/" className="headerLink">
            Home
          </Link>
          <Link to="/about" className="headerLink">
            About
          </Link>
          <Link to="/contact" className="headerLink">
            Contact
          </Link>
          <Link to="/author" className="headerLink">
            Author
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
