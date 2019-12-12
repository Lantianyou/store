import Reset from '../components/Reset'
const Reset = (props) => (
  <div>
    <p>Reset your password {props.query.token}</p>
    <Reset resetToken={props.query.resetToken} />
  </div>
)

export default Reset
