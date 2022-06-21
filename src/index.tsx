import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {relayStylePagination} from "@apollo/client/utilities";
import {
    ApolloClient,
    NormalizedCacheObject,
    ApolloProvider,
    InMemoryCache
} from '@apollo/client';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    characters: relayStylePagination(),
                },
            },
        },
    }),
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
