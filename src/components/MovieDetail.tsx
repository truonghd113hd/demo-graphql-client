import React, { Fragment } from 'react'
import { Card } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { getStudiosAndDirector, getMovie, getMovies } from '../graphql-client/query'

const MovieDetail = ({ movie }: any) => {
    const { loading, error, data } = useQuery(getMovies, {fetchPolicy: 'cache-first'})
    if (loading) return <p>Loading</p>
    if (error) {
        console.log(error)
        return <p>Error</p>
    }
    console.log(data)
    return (
        <Card bg='info' text='white' className='shadow'>
            <Card.Body>
                {
                    // movie === null ? (<Card.Text>Please select</Card.Text>) :
                    //     (<Fragment>
                    //         <Card.Title>
                    //             Name: {data?.getMovie?.name}
                    //         </Card.Title>
                    //         <Card.Subtitle>
                    //             Description: {data?.getMovie?.description}
                    //         </Card.Subtitle>
                    //         <p>Studios: {data?.getMovie?.studios?.name}</p>
                    //         <p>Director: {data?.getMovie?.director?.name}</p>
                    //     </Fragment>)
                }
            </Card.Body>
        </Card>
    )
}

export default MovieDetail