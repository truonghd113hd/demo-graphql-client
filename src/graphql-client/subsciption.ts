import { gql } from '@apollo/client'

export const MOVIE_ADDED_SUBSCRIPTION = gql`
  subscription dataAdded {
    dataAdded {
        _id
        name
        description
        duration
            studios {
                _id
                name
            }
            director {
                _id
                name
            }
    }
  }
`