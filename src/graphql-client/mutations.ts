import { ApolloCache, gql, useMutation } from '@apollo/client'
import { DeleteMovieResponse, EditMovieInput, MovieInput, NewMovieResponse } from '../interfaces/interface'
import { GET_MOVIES } from './query'

const ADD_NEW_MOVIE = gql`
mutation newMovie($name: String!, $description: String, $duration: Int!, $studios: String!, $director: String!) {
    newMovie(input: {name: $name, description: $description, duration: $duration, director: $director, studios: $studios}) {
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

const UPDATE_MOVIE = gql`
mutation updateMovie($id: String!, $name: String!, $description: String, $duration: Int!, $studios: String!, $director: String!) {
    updateMovie(input: {name: $name, description: $description, duration: $duration, director: $director, studios: $studios}, id: $id) {
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

const DELETE_MOVIE = gql`
mutation deleteMovie($id: String!) {
    deleteMovie(id: $id)
}
`

const updateCacheData = (cache: ApolloCache<any>, results: any) => {
    cache.modify({
        fields: {
            getMovies(existingData = []) {
                console.log('innn')
                const newData = results?.data?.newMovie
                cache.writeQuery({
                    query: GET_MOVIES,
                    data: { newData, ...existingData },
                })
            }
        }
    })
}

const deleteCacheData = (cache: ApolloCache<any>, id: string) => {
    const normalizedId = cache.identify({ id, __typename: 'Movie' });
    cache.modify({
        fields: {
            getMovies() {
                cache.evict({
                    id: normalizedId
                })
                cache.gc()
            }
        }
    })
}

export function useAddNewMovie() {
    return useMutation<NewMovieResponse, MovieInput>(ADD_NEW_MOVIE, {
        update(cache, results) {
            updateCacheData(cache, results)
        }
    })
}

export function useEditMovie() {
    return useMutation<NewMovieResponse, EditMovieInput>(UPDATE_MOVIE)
}

export function useDeleteMovie() {
    return useMutation<DeleteMovieResponse, { id: string }>(DELETE_MOVIE, {
        update(cache, results) {
            deleteCacheData(cache, results.data?.deleteMovie || "")
        }
    })
}
