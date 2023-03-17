import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import BookList from './components/MovieList'
import SubmitForm from './components/SubmitForm'
import client from './config/config'
import { ApolloProvider } from '@apollo/client'

function App() {
  return (
    <ApolloProvider client={client}>
      <Container className='py-3 mt-3' style={{ backgroundColor: 'lightcyan' }}>
        <h1 className='text-center text-info mb-3'>
          My Movies
        </h1>
        <hr></hr>
        {/* <SubmitForm></SubmitForm> */}
        <hr></hr>
        <BookList></BookList>
      </Container>
    </ApolloProvider>
  );
}

export default App;
