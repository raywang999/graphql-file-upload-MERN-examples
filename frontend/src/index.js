//import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

import App from './App';

// Create ApolloClient capable of handling file uploads
// Refer to https://www.apollographql.com/docs/react/api/core/ApolloClient/ 
const client = new ApolloClient({
  cache: new InMemoryCache({}),
  ssrMode: typeof window === 'undefined',
  link: createUploadLink({
    uri: process.env.REACT_APP_API_URI,
  }),
});

ReactDOM.render(
  // Allow child Components to access our ApolloClient
  <ApolloProvider 
    client={client}
  >
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

//reportWebVitals();
