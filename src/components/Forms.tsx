import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { GET_MOVIES, useGetMovies, useGetStudiosAndDirector } from '../graphql-client/query'
import { useAddNewMovie, useEditMovie } from '../graphql-client/mutations'
import { GetStudiosAndDirectorResponse, Movie } from '../interfaces/interface'


const Forms = ({ movie, studioAndDirectorData }: {movie: Movie | null, studioAndDirectorData: GetStudiosAndDirectorResponse | undefined}) => {
    const [newMovie, setNewMovie] = useState({
        name: "",
        description: "",
        director: "",
        studios: "",
        duration: "",
        movieId: "",
    })

    const [prevProps, setPrevProps] = useState(movie?._id)
    const [addMovie] = useAddNewMovie()
    const [editMovie] = useEditMovie()

    const setNewData = (data: any) => {
        newMovie.name = data?.name
        newMovie.description = data?.description
        newMovie.director = data?.director?._id
        newMovie.studios = data?.studios?._id
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
                director: newMovie.director,
                studios: newMovie.studios,
                duration: Number(newMovie.duration)
            },
            // refetchQueries: [{ query: GET_MOVIES }],
        })
    }

    const editData = (event: any) => {
        event.preventDefault();
        editMovie({
            variables: {
                id: newMovie.movieId,
                name: newMovie.name,
                description: newMovie.description,
                director: newMovie.director,
                studios: newMovie.studios,
                duration: Number(newMovie.duration)
            },
            // refetchQueries: [{ query: getMovies }],
        })
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
                    (<Form.Control as={'select'} defaultValue='Select Derector' name='director' onChange={onInputChange} value={newMovie.director}>
                        <option value={""} disabled>Select Director</option>
                        {
                            studioAndDirectorData?.getDirectors?.map((director) => (
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
                    (<Form.Control as={'select'} defaultValue='Select Studio' name='studios' onChange={onInputChange} value={newMovie.studios}>
                        <option value={""} disabled>Select Studio</option>
                        {
                            studioAndDirectorData?.getStudios?.map((studio) => (
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