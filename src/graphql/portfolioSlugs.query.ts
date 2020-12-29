// Dependencies
import { gql } from '@apollo/client'

export default gql`
  query portfolioSlugs($first: Int) {
    portfolios(first: $first, orderBy: createdAt_ASC) {
      slug
    }
  }
`