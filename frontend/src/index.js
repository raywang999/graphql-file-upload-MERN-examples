import React from 'react';
import ReactDOM from 'react-dom';
//import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  ApolloProvider,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

import { cache } from './cache';
import App from './App';

const client = new ApolloClient({
  cache,
  ssrMode: typeof window === 'undefined',
  link: createUploadLink({
    uri: process.env.REACT_APP_API_URI,
  }),
});

ReactDOM.render(
  <ApolloProvider 
    client={client}
  >
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

//reportWebVitals();
