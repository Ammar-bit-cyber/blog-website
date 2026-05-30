
import { Link } from 'react-router-dom'


function Header() {
  return (
    <header className="siteHeader">
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