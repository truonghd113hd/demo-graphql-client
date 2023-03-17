import { gql, useQuery } from '@apollo/client'
import { GetMovieResponse, GetMoviesResponse, GetStudiosAndDirectorResponse } from '../interfaces/interface'

const getDirectors = gql`
    query getDirectors {
        getDirectors {
            _id
            name
        }
    }
`

const GET_STUDIO_AND_DIRECTOR = gql`
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

export const GET_MOVIES = gql`
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

export const GET_MOVIE = gql`
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

export function useGetMovies() {
    return useQuery<GetMoviesResponse>(GET_MOVIES)
}

export function useGetMovie(id: string | null) {
    return useQuery<GetMovieResponse>(GET_MOVIE, { variables: {id}, skip: !id})
}

export function useGetStudiosAndDirector() {
    return useQuery<GetStudiosAndDirectorResponse>(GET_STUDIO_AND_DIRECTOR)
}
