import Router from 'next/router'
import Link from 'next/link'
import NProgress from 'nprogress'
import NavStyles from './styles/NavStyles'

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => {
  NProgress.done()
}
Router.onRouteChangeError = () => {
  NProgress.done()
}

const Nav = () => (
  <NavStyles>
    <Link href="/items">
      <a>Shop</a>
    </Link>
    <Link href="/sell">
      <a>Sell</a>
    </Link>
    <Link href="/signup">
      <a>Sign up</a>
    </Link>
    <Link href="/orders">
      <a>Orders </a>
    </Link>
    <Link href="/me">
      <a>Me</a>
    </Link>
  </NavStyles>
)

export default Nav
