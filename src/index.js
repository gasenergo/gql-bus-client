import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo";
import registerServiceWorker from './registerServiceWorker';


// apollo client setup
const client = new ApolloClient({
    uri: "https://gql-bus-server.herokuapp.com/graphql"
});






ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, 
    document.getElementById('root'));
registerServiceWorker();
