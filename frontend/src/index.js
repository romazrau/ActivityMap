import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import './index.css';
import store from "./redux/store/index";
import App from "./containers/App"
import * as serviceWorker from './serviceWorker';

import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:4005/'
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4005/`,
  options: { reconnect: true }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache().restore({})
})

render(
  <ApolloProvider client={client}>
    <Provider store={store}>
    <App ></App>
  </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);


serviceWorker.unregister();
