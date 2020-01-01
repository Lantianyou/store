import { mount } from 'enzyme'
import wait from 'waait'
import toJSON from 'enzyme-to-json'
import { MockedProvider } from 'react-apollo/test-utils'
import RequestReset, {
  REQUEST_RESET_MUTATION
} from '../components/RequestReset'

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email: 'jason@email.com' }
    },
    result: {
      data: {
        requestReset: {
          message: 'success',
          __typename: 'Message'
        }
      }
    }
  }
]

describe('<RequestReset />', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    )
    const form = wrapper.find('form[data-test="reset"]')
    expect(toJSON(form)).toMatchSnapshot()
  })

  it('test mutation', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    )
    wrapper.find('input').simulate('change', {
      target: {
        name: 'email',
        value: 'jason@email.com'
      }
    })
    wrapper.find('form').simulate('submit')
    await wait()
    wrapper.update()
  })
})
