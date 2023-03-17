import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { GetStudiosAndDirectorResponse, Movie } from '../interfaces/interface'
import Forms from './Forms'

const SubmitForm = ({ movie, studioAndDirectorData }: {movie: Movie | null, studioAndDirectorData: GetStudiosAndDirectorResponse | undefined}) => {
  return <Row>
    <Col>
     <Forms movie={movie} studioAndDirectorData={studioAndDirectorData}></Forms>
    </Col>
  </Row>
}

export default SubmitForm