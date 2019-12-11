import Router from 'next/router'
import Link from 'next/link'
import NProgress from 'nprogress'
import Signout from './Signout'
import User from './User'
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
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/items">
          <a>Shop</a>
        </Link>
        {me && (
          <>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders </a>
            </Link>
            <Link href="/me">
              <a>Me</a>
            </Link>
            <Signout />
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>Sign up</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
)

export default Nav
