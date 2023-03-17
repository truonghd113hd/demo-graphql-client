import React, { useEffect, useState } from 'react'
import { Col, Card, Row, Button } from 'react-bootstrap'
import MovieDetail from '../../components/MovieDetail'
import { GET_MOVIES, useGetMovies, useGetStudiosAndDirector } from '../../graphql-client/query'
import { useDeleteMovie } from '../../graphql-client/mutations'
import SubmitForm from '../../components/SubmitForm'
import { MOVIE_ADDED_SUBSCRIPTION } from '../../graphql-client/subsciption'

const HomePage = () => {
    const [movieSelected, setMovieSelected] = useState(null)
    const { data: moviesData, subscribeToMore } = useGetMovies()
    const { data: studioAndDirectorData } = useGetStudiosAndDirector()

    subscribeToMore({
        document: MOVIE_ADDED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          console.log(subscriptionData.data)
          return prev
        //   const newLink = subscriptionData.data.dataAdded;
        //   const exists = prev.feed.links.find(
        //     ({ id }) => id === newLink.id
        //   );
        //   if (exists) return prev;
      
        //   return Object.assign({}, prev, {
        //     feed: {
        //       links: [newLink, ...prev.feed.links],
        //       count: prev.feed.links.length + 1,
        //       __typename: prev.feed.__typename
        //     }
        //   });
        }
      });

    const deleteData = (id: string) => {
        movieDeleteData({
            variables: {
                id: id
            },
        })
    }

    const [movieDeleteData] = useDeleteMovie()
    return (<Row>
        <Col xs={6}>

            {
                moviesData?.getMovies?.map((movie: any) => (
                    <Card border='info' text='info' className='text-center shadow' key={movie._id}>
                        <Card.Body onClick={setMovieSelected.bind(this, movie)}>
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
            <SubmitForm movie={movieSelected} studioAndDirectorData={studioAndDirectorData}></SubmitForm>
            {/* <MovieDetail movie={movieIdSelected}></MovieDetail> */}
        </Col>
        {/* <Button onClick={refetchData}>Refetch Data</Button> */}
    </Row>)
}

export default HomePage