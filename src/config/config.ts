import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, concat, WatchQueryFetchPolicy } from '@apollo/client'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjc4OTM0NDM3LCJleHAiOjE2ODAyMzA0Mzd9.Ilo15cYEp28dsCEe7buHfuZNqJZrltTVl2n4VaBPq4E"

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : "",
        },
    });
    return forward(operation);
});

const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
    // defaultOptions: {
    //     watchQuery: {
    //         fetchPolicy: 'cache-and-network',
    //         nextFetchPolicy(currentFetchPolicy) {
    //             console.log('innnn')
    //             console.log(currentFetchPolicy)
    //             // if (
    //             //     currentFetchPolicy === 'network-only' ||
    //             //     currentFetchPolicy === 'cache-and-network'
    //             // ) {
    //             //     // Demote the network policies (except "no-cache") to "cache-first"
    //             //     // after the first request.
    //             //     return 'cache-first';
    //             // }
    //             // Leave all other fetch policies unchanged.
    //             return currentFetchPolicy;
    //         },
    //     },
    // },
})

export default client