import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import SubmitForm from './components/SubmitForm'
import client from './config/config'
import { ApolloProvider } from '@apollo/client'
import HomePage from './pages/home/Home';

function App() {
  return (
    <ApolloProvider client={client}>
      <Container className='py-3 mt-3' style={{ backgroundColor: 'lightcyan' }}>
        <h1 className='text-center text-info mb-3'>
          My Movies
        </h1>
        <hr></hr>
        <HomePage></HomePage>
      </Container>
    </ApolloProvider>
  );
}

export default App;
