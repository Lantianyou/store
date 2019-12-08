import Link from 'next/link'

const Home = props => (
  <div>
    <h1>Hello World</h1>
    <Link href="/sell">
      <a>sell</a>
    </Link>
  </div>
)

export default Home
