import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo";
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
    uri: "https://gql-bus-server.herokuapp.com/graphql"
});






ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, 
    document.getElementById('root'));
registerServiceWorker();
