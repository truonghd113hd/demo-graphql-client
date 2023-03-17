import React, { useState } from 'react'
import { Col, Card, Row, Button } from 'react-bootstrap'
import MovieDetail from './MovieDetail'
import { useQuery, useMutation } from '@apollo/client'
import { getMovies } from '../graphql-client/query'
import { deleteMovie, updateMovie } from '../graphql-client/mutations'
import SubmitForm from './SubmitForm'

const MovieList = () => {
    const [movieIdSelected, setMovieSelected] = useState(null)
    const [stateData, setStateData] = useState(null)
    const { loading, error, data } = useQuery(getMovies)
    
    const deleteData = (id: string) => {
        movieDeleteData({
            variables: {
                id: id
            },
            // refetchQueries: [{ query: getMovies }],
        })
    }
    const editData = (id: string) => {
        console.log(id)
    }

    

    const refetchData = () => {

    }

    const [movieDeleteData, ] = useMutation(deleteMovie)
    const [movieEditData, ] = useMutation(updateMovie)
    if (loading) return <p>Loading</p>
    if (error) return <p>Error</p>
    return (<Row>
        <Col xs={6}>

            {
                data?.getMovies?.map((movie: any) => (
                    <Card border='info' text='info' className='text-center shadow' key={movie._id}>
                        <Card.Body onClick={setMovieSelected.bind(this, movie._id)}>
                            {movie.name}
                        </Card.Body>
                        <Card.Footer>
                            {/* <Button className='float-right' onClick={() => editData(movie._id)}>Edit</Button> */}

                            <Button className='float-right' variant='info' onClick={() => deleteData(movie._id)}>Delete</Button>
                        </Card.Footer>
                    </Card>))
            }
        </Col>
        <Col>
            {/* <SubmitForm movie={movieIdSelected}></SubmitForm> */}
            <MovieDetail movie={movieIdSelected}></MovieDetail>
        </Col>
        <Button onClick={refetchData}>Refetch Data</Button>
    </Row>)
}

export default MovieList