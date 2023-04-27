import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import Pokemon from '../components/Pokemon';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../components/Spinner'

function PokemonsContainer({ pokemons }) {
  const [nextPokemon, setNextPokemon] = useState(16);
  const [listOfPokemons, setListOfPokemons] = useState(pokemons);
 
  const loadMore = async () => {
    setNextPokemon(nextPokemon + 16);
    const client = new ApolloClient({
      uri: "https://graphql-pokemon2.vercel.app/",
      cache: new InMemoryCache(),
    });
    await new Promise(resolve => setTimeout(resolve, 500));
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
      variables: { first: nextPokemon },
      fetchPolicy: "no-cache",
    });
    
    const newPokemons = data.pokemons.filter(pokemon => 
      !listOfPokemons.some(p => p.id === pokemon.id)
    );
    
    setListOfPokemons([...listOfPokemons, ...newPokemons]);
  }

  return (
    <>
     <InfiniteScroll
          dataLength={listOfPokemons.length}
          next={loadMore}
          hasMore={listOfPokemons!==151}
          loader={<Spinner/>}


        >
      
      <div className="container text-center mt-4 p-3 " style={{backgroundColor:"lightgrey"}} >
      <div class="row row-cols-3 ">
      
      
        {listOfPokemons && listOfPokemons.map(pokemon => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
        </div>
        
      </div>
      
      
      </InfiniteScroll>
    
   </>
  );
}

export default PokemonsContainer;
