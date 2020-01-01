import { mount } from 'enzyme'
import wait from 'waait'
import toJSON from 'enzyme-to-json'
import Router from 'next/router'
import { MockedProvider } from 'react-apollo/test-utils'
import CreateItem, { CREATE_ITEM_MUTATION } from '../components/CreateItem'
import { fakeItem } from '../lib/testUtils'

const dogImage = 'https://dog.com/dog.jpg'

global.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    secure_url: dogImage,
    eager: [{ secure_url: dogImage }]
  })
})

describe('<CreateItem />', () => {
  it('snapshot test', async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    )
    const form = wrapper.find('form[data-test="form"]')
    expect(toJSON(form)).toMatchSnapshot()
  })
  it('upload file test', async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    )
    const input = wrapper.find('input[type="file"]')
    input.simulate('change', { target: { files: ['fakedog.jpg'] } })
    await wait()
    const component = wrapper.find('CreateItem').instance()
    expect(component.state.image).toEqual(dogImage)
    global.fetch.mockReset()
  })
  it('uodate state change', async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    )
    wrapper
      .find('#title')
      .simulate('change', { target: { value: 'test value', name: 'title' } })
    wrapper.find('#price').simulate('change', {
      target: { value: 5000, name: 'price', type: 'number' }
    })
    wrapper.find('#description').simulate('change', {
      target: { value: 'test description', name: 'description' }
    })
    expect(wrapper.find('CreateItem').instance().state).toMatchObject({
      title: 'test value',
      price: 5000,
      description: 'test description'
    })
  })
  it('creates an item', async () => {
    const item = fakeItem()
    const mocks = [
      {
        request: {
          query: CREATE_ITEM_MUTATION,
          variables: {
            title: item.title,
            description: item.description,
            image: '',
            largeImage: '',
            price: item.price
          }
        },
        result: {
          data: {
            createItem: {
              ...fakeItem,
              id: 'abc123',
              __typename: 'Item'
            }
          }
        }
      }
    ]
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <CreateItem />
      </MockedProvider>
    )

    wrapper
      .find('#title')
      .simulate('change', { target: { value: item.title, name: 'title' } })
    wrapper.find('#price').simulate('change', {
      target: { value: item.price, name: 'price', type: 'number' }
    })
    Router.router = { push: jest.fn() }
    wrapper.find('form').simulate('submit')
    await wait(50)
  })
})
