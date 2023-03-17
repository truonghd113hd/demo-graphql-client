import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, concat, WatchQueryFetchPolicy, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities';
// import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { WebSocketLink } from '@apollo/client/link/ws'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjc4OTM0NDM3LCJleHAiOjE2ODAyMzA0Mzd9.Ilo15cYEp28dsCEe7buHfuZNqJZrltTVl2n4VaBPq4E"

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const wsLink = new WebSocketLink(
    new SubscriptionClient("ws://localhost:4000/graphql", {
      connectionParams: {
        authToken: token
      }
    })
  );

const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : "",
        },
    });
    return forward(operation);
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

const client = new ApolloClient({
    link: concat(authMiddleware, splitLink),
    cache: new InMemoryCache(
        { typePolicies: {
            // Query: {
            //     fields: {
            //         name: {
            //             keyArgs: 
            //         }
            //     }
            // }
        } }
    ),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy(currentFetchPolicy) {
                return 'cache-and-network'
                // if (
                //     currentFetchPolicy === 'network-only' ||
                //     currentFetchPolicy === 'cache-and-network'
                // ) {
                //     // Demote the network policies (except "no-cache") to "cache-first"
                //     // after the first request.
                //     return 'cache-first';
                // }
                // Leave all other fetch policies unchanged.
                // return currentFetchPolicy;
            },
        },
    },
})

export default client