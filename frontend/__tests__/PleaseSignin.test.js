import { mount } from 'enzyme'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import PleaseSignin from '../components/PleaseSignin'
import { CURRENT_USER_QUERY } from '../components/User'
import { fakeUser } from '../lib/testUtils'

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

describe('<PleaseSignin />', () => {
  it('not signed in test', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedinMock}>
        <PleaseSignin />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    expect(wrapper.text()).toContain('please sign in and continuing')
    expect(wrapper.find('Signin').exists()).toBeTruthy()
  })
  it('signed in test', async () => {
    const Child = () => <div>child</div>
    const wrapper = mount(
      <MockedProvider mocks={signedinMock}>
        <PleaseSignin>
          <Child />
        </PleaseSignin>
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    expect(wrapper.contains(<Child />)).toBeTruthy()
  })
})
