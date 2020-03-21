import React from 'react'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo-hooks'
import Busho from '../components/Busho'
import SubmitButton from '../components/SubmitButton'
import gql from 'graphql-tag'



const cache = new InMemoryCache();

const httpLink = new HttpLink({
    uri: 'http://localhost:5000/graphql',
});

const client = new ApolloClient({
    link: httpLink,
    cache,
    resolvers: {
        Mutation: {
            mutChangeBusho: (_root, variables, { cache }) => {
                // console.log(variables.id)
                cache.writeQuery({
                    query: gql`{
                        selectedBusho
                    }`,
                    data: {
                        selectedBusho: variables.id
                    },
                });
            },
        },
    }
})

export default {
    title: '画面1',
    component: Busho,
}

// ローカルステートの初期化
cache.writeQuery({
    query: gql`{
        selectedBusho
    }`,
    data: {
        selectedBusho: ''  // 部署初期選択値
    },
});
console.log(cache.data)

// ComponentをApolloProviderでラップする
// defaultValueでデフォルト値を渡す
export const BushoStory1 = () =>
    <ApolloProvider client={client}>
        <Busho />
        <SubmitButton />
    </ApolloProvider>
