import { gql } from '@apollo/client'

const getDirectors = gql`
    query getDirectors {
        getDirectors {
            _id
            name
        }
    }
`

const getStudiosAndDirector = gql`
    query getStudiosAndDirector {
        getStudios {
            _id
            name
        }
        getDirectors {
            _id
            name
        }
    }
`

const getMovies = gql`
    query getMovies {
        getMovies {
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

const getMovie = gql`
    query getMovie($id: String!) {
        getMovie(id: $id) {
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

export { getDirectors, getMovie, getMovies, getStudiosAndDirector }