import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    ApolloClient,
    NormalizedCacheObject,
    ApolloProvider,
    InMemoryCache
} from '@apollo/client';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache:new InMemoryCache(),
    uri: 'https://rickandmortyapi.com/graphql',
});

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
      <App/>
      </ApolloProvider>
  </React.StrictMode>,
document.getElementById('root')
);

reportWebVitals();
