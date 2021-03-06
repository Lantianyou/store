import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import { ApolloConsumer } from 'react-apollo'
import RemoveFromCart, {
  REMOVE_FROM_CART_MUTATION
} from '../components/RemoveFromCart'
import { CURRENT_USER_QUERY } from '../components/User'
import { fakeUser, fakeCartItem } from '../lib/testUtils'

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem({ id: 'abc123' })]
        }
      }
    }
  },
  {
    request: { query: REMOVE_FROM_CART_MUTATION, variables: { id: 'abc123' } },
    result: {
      data: {
        removeFromCart: {
          __typename: 'CartItem',
          id: 'abc123'
        }
      }
    }
  }
]

global.alert = console.log

describe('<RemoveFromCart />', () => {
  it('snapshot test', () => {
    const wrapper = mount(
      <MockedProvider>
        <RemoveFromCart id="abc123" />
      </MockedProvider>
    )

    expect(toJSON(wrapper.find('button'))).toMatchSnapshot()
  })
  it('remove test', async () => {
    let apolloClient
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {(client) => {
            apolloClient = client
            return <RemoveFromCart id="abc123" />
          }}
        </ApolloConsumer>
      </MockedProvider>
    )
    const res = await apolloClient.query({ query: CURRENT_USER_QUERY })
    expect(res.data.me.cart).toHaveLength(1)
    wrapper.find('button').simulate('click')
    await wait()
    const res1 = await apolloClient.query({ query: CURRENT_USER_QUERY })
    // expect(res1.data.me.cart).toHaveLength(0)

    console.log(res1.data.me.cart)
  })
})
