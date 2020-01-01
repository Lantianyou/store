import React from 'react'
import PaginationStyles from './styles/PaginationStyles'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Head from 'next/head'
import Link from 'next/link'
import { perPage } from '../config'

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`

const Pagination = (props) => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) {
        return <p>loading...</p>
      }
      const count = data.itemsConnection.aggregate.count
      const page = props.page
      const pages = Math.ceil(count / perPage)
      return (
        <PaginationStyles data-test="pagination">
          <Head>
            <title>
              store -{page} of {pages}
            </title>
          </Head>
          <Link
            prefetch
            href={{
              pathname: 'items',
              query: { page: page - 1 }
            }}
          >
            <a className="prev" aria-disabled={page <= 1}>
              prev
            </a>
          </Link>
          <p>{count} items total</p>
          <Link
            prefetch
            href={{
              pathname: 'items',
              query: { page: page + 1 }
            }}
          >
            <a className="next" aria-disabled={page >= pages}>
              next
            </a>
          </Link>
          <p>
            Page {props.page} of <span className="allpages">{pages}</span>
          </p>
        </PaginationStyles>
      )
    }}
  </Query>
)

export default Pagination
export { PAGINATION_QUERY }
