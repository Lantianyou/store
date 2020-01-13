import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import SingleItem, { SINGLE_ITEM_QUERY } from '../components/SingleItem'
import { fakeUser, fakeCartItem } from '../lib/testUtils'
import { CURRENT_USER_QUERY } from '../components/User'
import Nav from '../components/Nav'

const notSignedinMock = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } }
  }
]

const signedinMock = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } }
  }
]

const signedinMockWithCartItem = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem(), fakeCartItem()]
        }
      }
    }
  }
]

describe('<Nav />', () => {
  it('not signed in nav', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedinMock}>
        <Nav />
      </MockedProvider>
    )
    await wait()
    wrapper.update()

    const nav = wrapper.find('ul[data-test="nav"]')
  })

  it('signed in nav', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedinMock}>
        <Nav />
      </MockedProvider>
    )
    await wait()
    wrapper.update()

    const nav = wrapper.find('ul[data-test="nav"]')
    expect(nav.children().length).toBe(6)
    expect(nav.text()).toContain('Sign out')
  })

  it('signed in with cart', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedinMockWithCartItem}>
        <Nav />
      </MockedProvider>
    )
    await wait()
    wrapper.update()

    const nav = wrapper.find('ul[data-test="nav"]')
    const count = nav.find('div.count')
    expect(toJSON(count)).toMatchSnapshot()
  })
})
