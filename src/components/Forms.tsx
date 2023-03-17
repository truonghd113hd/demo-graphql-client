import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useQuery, useMutation } from '@apollo/client'
import { getDirectors, getMovies, getStudiosAndDirector } from '../graphql-client/query'
import { addNewMovie, updateMovie } from '../graphql-client/mutations'


const Forms = ({ movie }: any) => {
    const [newMovie, setNewMovie] = useState({
        name: "",
        description: "",
        directorId: "",
        studioId: "",
        duration: "",
        movieId: "",
    })

    const [prevProps, setPrevProps] = useState(movie?._id)
    const setNewData = (data: any) => {
        newMovie.name = data?.name
        newMovie.description = data?.description
        newMovie.directorId = data?.director?._id
        newMovie.studioId = data?.studios?._id
        newMovie.duration = data?.duration
        newMovie.movieId = data?._id
    }

    useEffect(() => {
        if (movie?._id !== prevProps) {
            setPrevProps(movie?._id)
            setNewData(movie)
        }
    });

    const onInputChange = (event: any) => {
        setNewMovie({
            ...newMovie,
            [event?.target?.name]: event.target.value
        })
    }

    // setNewData(movie)

    const addNew = (event: any) => {
        event.preventDefault();
        addMovie({
            variables: {
                name: newMovie.name,
                description: newMovie.description,
                directorId: newMovie.directorId,
                studioId: newMovie.studioId,
                duration: Number(newMovie.duration)
            },
            refetchQueries: [{ query: getMovies }],
        })
    }

    const editData = (event: any) => {
        event.preventDefault();
        editMovie({
            variables: {
                id: newMovie.movieId,
                name: newMovie.name,
                description: newMovie.description,
                directorId: newMovie.directorId,
                studioId: newMovie.studioId,
                duration: Number(newMovie.duration)
            },
            // refetchQueries: [{ query: getMovies }],
        })
    }

    const { loading, error, data,  } = useQuery(getStudiosAndDirector)
    const [addMovie, ] = useMutation(addNewMovie)
    const [editMovie, ] = useMutation(updateMovie)
    if (error) {
        console.log(error)
        return <p>Error</p>
    }
    return (
        <Form>
            <Form.Group>
                <Form.Control type='text' placeholder='name' onChange={onInputChange} value={newMovie.name} name='name'>
                </Form.Control>
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control type='text' placeholder='description' onChange={onInputChange} value={newMovie.description} name='description'>

                </Form.Control>
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control type='number' placeholder='duration' onChange={onInputChange} value={newMovie.duration} name='duration'>

                </Form.Control>
            </Form.Group>
            <br></br>
            <Form.Group>
                {
                    loading ? <p>Loading</p> : (<Form.Control as={'select'} defaultValue='Select Derector' name='directorId' onChange={onInputChange} value={newMovie.directorId}>
                        <option value={""} disabled>Select Director</option>
                        {
                            data.getDirectors.map((director: any) => (
                                <option key={director._id} value={director._id}>
                                    {director.name}
                                </option>
                            ))
                        }
                    </Form.Control>
                    )
                }

            </Form.Group>
            <br></br>
            <Form.Group>
                {
                    loading ? <p>Loading</p> : (<Form.Control as={'select'} defaultValue='Select Studio' name='studioId' onChange={onInputChange} value={newMovie.studioId}>
                        <option value={""} disabled>Select Studio</option>
                        {
                            data.getStudios.map((studio: any) => (
                                <option key={studio._id} value={studio._id}>
                                    {studio.name}
                                </option>
                            ))
                        }
                    </Form.Control>
                    )
                }

            </Form.Group>
            <br></br>
            {
                newMovie.movieId !== "" ? (<Button className='float-right' variant='info' onClick={editData} >Edit</Button>) : 
                (<Button className='float-right' variant='info' onClick={addNew} >Add new</Button>)
            }
            
        </Form>
    )
}

export default Forms