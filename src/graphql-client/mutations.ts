import { gql } from '@apollo/client'

const addNewMovie = gql`
mutation newMovie($name: String!, $description: String, $duration: Int!, $studioId: String!, $directorId: String!) {
    newMovie(input: {name: $name, description: $description, duration: $duration, director: $directorId, studios: $studioId}) {
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

const updateMovie = gql`
mutation updateMovie($id: String!, $name: String!, $description: String, $duration: Int!, $studioId: String!, $directorId: String!) {
    updateMovie(input: {name: $name, description: $description, duration: $duration, director: $directorId, studios: $studioId}, id: $id) {
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

const deleteMovie = gql`
mutation deleteMovie($id: String!) {
    deleteMovie(id: $id)
}
`

export { addNewMovie, updateMovie, deleteMovie }