import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Forms from './Forms'

const SubmitForm = ({ movie }: any) => {
  return <Row>
    <Col>
     <Forms movie={movie}></Forms>
    </Col>
  </Row>
}

export default SubmitForm