import React, { Fragment } from 'react'
import { Card } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { useGetStudiosAndDirector, useGetMovie, useGetMovies } from '../graphql-client/query'
import { GetMovieResponse, GetStudiosAndDirectorResponse } from '../interfaces/interface'

const MovieDetail = ({ movie }: { movie: GetMovieResponse }) => {
    return (
        <Card bg='info' text='white' className='shadow'>
            <Card.Body>
                {
                    movie === null ? (<Card.Text>Please select</Card.Text>) :
                        (<Fragment>
                            <Card.Title>
                                Name: {movie?.getMovie?.name}
                            </Card.Title>
                            <Card.Subtitle>
                                Description: {movie?.getMovie?.description}
                            </Card.Subtitle>
                            <p>Studios: {movie?.getMovie?.studios?.name}</p>
                            <p>Director: {movie?.getMovie?.director?.name}</p>
                        </Fragment>)
                }
            </Card.Body>
        </Card>
    )
}

export default MovieDetail