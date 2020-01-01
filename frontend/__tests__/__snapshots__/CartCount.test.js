import { shallow, mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import CartItemCount from '../../components/CartItemCount'

describe('<CartItemCount />', () => {
  it('renders', () => {
    shallow(<CartItemCount count={10} />)
  })
  it('matches the count', () => {
    const wrapper = shallow(<CartItemCount count={11} />)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
  it('change the props', () => {
    const wrapper = shallow(<CartItemCount count={11} />)
    expect(toJSON(wrapper)).toMatchSnapshot()
    wrapper.setProps({ count: 90 })
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})
