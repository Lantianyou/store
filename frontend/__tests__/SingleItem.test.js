import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
import SingleItem, { SINGLE_ITEM_QUERY } from '../components/SingleItem'
import { MockedProvider } from 'react-apollo/test-utils'
import { fakeItem } from '../lib/testUtils'

describe('<SingleItem />', () => {
  it('renders with proper data', async () => {
    const mocks = [
      {
        request: { query: SINGLE_ITEM_QUERY, variables: { id: 'abc123' } },
        result: {
          data: {
            item: fakeItem()
          }
        }
      }
    ]
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id="abc123" />
      </MockedProvider>
    )
    expect(wrapper.text()).toBe('loading...')
    await wait()
    wrapper.update()

    expect(toJSON(wrapper.find('h2'))).toMatchSnapshot()
    expect(toJSON(wrapper.find('p'))).toMatchSnapshot()
    expect(toJSON(wrapper.find('img'))).toMatchSnapshot()
  })

  it('errors', async () => {
    const mocks = [
      {
        request: { query: SINGLE_ITEM_QUERY, variables: { id: 'abc123' } },
        result: {
          errors: [{ message: 'Image not found' }]
        }
      }
    ]
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id="abc123" />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    const item = wrapper.find('[data-test="graphql-error"]')
    expect(item.text()).toContain('Image not found')
    expect(toJSON(item)).toMatchSnapshot()
  })
})
