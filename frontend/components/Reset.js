import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { CURRENT_USER_QUERY } from './User'
import Form from './styles/Form'
import Error from './ErrorMessage'

const REQUEST_MUTATION = gql`
  mutation REQUEST_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetRequest(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired
  }
  state = {
    password: '',
    confirmPassword: ''
  }
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <Mutation
        mutation={REQUEST_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.props.password,
          confirmPassword: this.props.confirmPassword
        }}
        refetchQueries={[
          {
            query: CURRENT_USER_QUERY
          }
        ]}
      >
        {(reset, { error, loading, called }) => {
          return (
            <Form
              method="POST"
              onSubmit={async (e) => {
                e.preventDefault()
                await reset()
                this.setState({ password: '', confirmPassword: '' })
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset your password</h2>
                <Error error={error} />
                {!error && !loading && called && (
                  <p>Success check your email</p>
                )}
                <label htmlFor="password">
                  Email
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="confirmPassword">
                  Email
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm assword"
                    value={this.state.confirmPassword}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Request reset</button>
              </fieldset>
            </Form>
          )
        }}
      </Mutation>
    )
  }
}
export default Reset
