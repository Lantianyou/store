import Link from 'next/link'
import Nav from './Nav'
import styled from 'styled-components'

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }

  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 10px solid ${props => props.theme.lightGrey};
  }
`

const Header = () => (
  <div>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>store</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar"></div>
    <div>Cart</div>
  </div>
)

export default Header