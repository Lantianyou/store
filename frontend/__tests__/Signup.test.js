import { mount, ReactWrapper } from 'enzyme'
import wait from 'waait'
import toJSON from 'enzyme-to-json'
import { ApolloConsumer } from 'react-apollo'
import { MockedProvider } from 'react-apollo/test-utils'
import Signup, { SIGNUP_MUTATION } from '../components/Signup'
import { CURRENT_USER_QUERY } from '../components/User'
import { fakeUser } from '../lib/testUtils'

function type(wrapper, name, value) {
  wrapper.find(`input[name="${name}"]`).simulate('change', {
    target: { name, value }
  })
}

const me = fakeUser()
const mocks = [
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        email: me.email,
        name: me.name,
        password: 'key'
      }
    },
    result: {
      data: {
        signup: {
          __typename: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name
        }
      }
    }
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me } }
  }
]

describe('<Signup />', () => {
  it('snapshot test', async () => {
    const wrapper = mount(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    )
    expect(toJSON(wrapper.find('form'))).toMatchSnapshot()
  })

  it('mutation test', async () => {
    let apolloClient
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {(client) => {
            apolloClient = client
            return <Signup />
          }}
        </ApolloConsumer>
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    type(wrapper, 'name', me.name)
    type(wrapper, 'email', me.email)
    type(wrapper, 'password', 'key')
    wrapper.update()
    wrapper.find('form').simulate('submit')
    await wait()

    const user = await apolloClient.query({ query: CURRENT_USER_QUERY })
    expect(user.data.me).toMatchObject(me)
  })
})
