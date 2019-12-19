import Reset from '../components/Reset'
const ResetPassword = (props) => (
  <div>
    <p>Reset your password {props.query.token}</p>
    <Reset resetToken={props.query.resetToken} />
  </div>
)

export default ResetPassword
ca