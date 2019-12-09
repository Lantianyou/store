import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Item from '../components/Item'

class Items extends Component {
  render() {
    return (
      <div>
        <p>items</p>
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) {
              return <p>Loading...</p>
            }
            if (error) {
              return <p>Error: {error.message}</p>
            }
            return (
              <ItemsList>
                {data.items.map(item => (
                  <p>{item.title}</p>
                ))}
              </ItemsList>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Items
