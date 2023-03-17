interface Director {
    _id: string,
    name: string
}

interface Studio {
    _id: string,
    name: string
}

export interface Movie {
    _id: string,
    name: string,
    duration: number,
    description: string,
    director: Director,
    studios: Studio
}

export interface GetMoviesResponse {
    getMovies: Movie[]
}

export interface GetMovieResponse {
    getMovie: Movie
}

export interface GetStudiosAndDirectorResponse {
    getDirectors: Director[],
    getStudios: Studio[]
}

export interface MovieInput {
    name: string,
    description: string,
    duration: number,
    director: string,
    studios: string,
}

export interface NewMovieInput {
    input: MovieInput
}

export interface EditMovieInput extends MovieInput {
    id: string
}

export interface UpdateMovieResponse {
    updateMovie: Movie
}

export interface NewMovieResponse {
    newMovie: Movie
}

export interface DeleteMovieResponse {
    deleteMovie: string
}
