import React from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
 import PokemonsContainer from '../../containers/PokemonsContainer';


export default function PokemonList({ pokemons }) {
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>
         <PokemonsContainer pokemons={pokemons}/>
      </ApolloProvider>
    </>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query pokemons($first: Int!) {
        pokemons(first: $first) {
          id
          number
          name
          weight {
            minimum
            maximum
          }
          height {
            minimum
            maximum
          }
          classification
          types
          resistant
          weaknesses
          fleeRate
          maxCP
          maxHP
          image
        }
      }
    `,
    variables: { first: 8 },
    fetchPolicy: "no-cache",
  });

  return {
    props: { pokemons: data.pokemons },
  };
}
