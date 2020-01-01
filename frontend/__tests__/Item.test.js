import ItemComponent from '../components/Item'
import { shallow, mount } from 'enzyme'
import formatMoney from '../lib/formatMoney'

const fakeItem = {
  id: 'id',
  title: 'title',
  price: 5000,
  descriotion: 'lorem',
  image: 'dog.jpg',
  largeImage: 'largeDog.jpg'
}

describe('<Item />', () => {
  it('d', () => {
    const price = '$50.43'
    expect(price).toMatchSnapshot()
  })
  // it('pricetag and title', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />)
  //   const PriceTag = wrapper.find('PriceTag')
  //   expect(PriceTag.children().text()).toBe(formatMoney(fakeItem.price))
  //   expect(wrapper.find('Title a').text()).toBe(fakeItem.title)
  // })
  // it('img', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />)
  //   const img = wrapper.find('img')
  //   expect(img.props().alt).toBe(fakeItem.title)
  // })
  // it('button', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />)
  //   const buttonList = wrapper.find('.buttonList')
  //   expect(buttonList.children()).toHaveLength(3)
  //   expect(buttonList.find('Link').exists()).toBe(true)
  // })
})
