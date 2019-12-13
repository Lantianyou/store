import Router from 'next/router'
import Link from 'next/link'
import NProgress from 'nprogress'
import { Mutation } from 'react-apollo'
import { TOGGLE_CART_MUTATION } from './Cart'
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
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {(toggleCart) => <button onClick={toggleCart}>cart</button>}
            </Mutation>
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
