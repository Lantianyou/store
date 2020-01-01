import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
import Pagination, { PAGINATION_QUERY } from '../components/Pagination'
import Router from 'next/router'
import { MockedProvider } from 'react-apollo/test-utils'

Router.router = {
  push() {},
  prefetch() {}
}

function makeMocksFor(length) {
  return [
    {
      request: { query: PAGINATION_QUERY },
      result: {
        data: {
          itemsConnection: {
            __typename: 'aggregate',
            aggregate: {
              __typename: 'count',
              count: length
            }
          }
        }
      }
    }
  ]
}

describe('<Pagination />', () => {
  it('pagination test to load', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(1)}>
        <Pagination page={1}></Pagination>
      </MockedProvider>
    )
    const pagination = wrapper.find('[data-test="pagination"]')
    expect(wrapper.text()).toContain('loading...')
  })

  it('pagination test with pages', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={1}></Pagination>
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    expect(wrapper.find('.allpages').text()).toEqual('5')
    const pagination = wrapper.find('div[data-test="pagination"]')
    expect(toJSON(pagination)).toMatchSnapshot()
  })

  it('first page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={1}></Pagination>
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    expect(wrapper.find('a.prev').prop('aria-disabled')).toBeTruthy()
    expect(wrapper.find('a.next').prop('aria-disabled')).toBeFalsy()
  })

  it('last page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={5}></Pagination>
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    expect(wrapper.find('a.prev').prop('aria-disabled')).toBeFalsy()
    expect(wrapper.find('a.next').prop('aria-disabled')).toBeTruthy()
  })
  it('page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={3}></Pagination>
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    expect(wrapper.find('a.prev').prop('aria-disabled')).toBeFalsy()
    expect(wrapper.find('a.next').prop('aria-disabled')).toBeFalsy()
  })
})
