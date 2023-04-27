import React from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
 import PokemonsContainer from '../containers/PokemonsContainer';
import {pokemoncover} from '../public/pokemoncover.jpg'
import Link from "next/link";
export default function Home({ pokemons }) {
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
    cache: new InMemoryCache(),
  });

  return (
    <> <div className="position-fixed top-0 bottom-0 left-0 right-0 z-index-2" style={{zIndex:-1, height: '100vh', width: '100vw' }}>
    <img
      src="https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&w=600"
      alt="Picture of the author"
      className="w-100 h-100"
      style={{ objectFit: 'cover' }}
      layout="fill"
    />
    
  </div>
  <div className='d-flex justify-content-center  w-100 h-100  rounded overflow-hidden mb-3 ' style={{zIndex:2,marginTop:"365px",marginLeft:"10px"}} >
                <Link href='/pokemons' passHref style={{textDecoration:"none", zIndex:4}} className="d-flex justify-content-center aling-item-center"  ><span className="btn btn-secondary p-2 rounded-pill" >PokemonList</span></Link>
       </div>
      
    </>
  );
}

// export async function getStaticProps() {
//   const client = new ApolloClient({
//     uri: "https://graphql-pokemon2.vercel.app/",
//     cache: new InMemoryCache(),
//   });

//   const { data } = await client.query({
//     query: gql`
//       query pokemons($first: Int!) {
//         pokemons(first: $first) {
//           id
//           number
//           name
//           weight {
//             minimum
//             maximum
//           }
//           height {
//             minimum
//             maximum
//           }
//           classification
//           types
//           resistant
//           weaknesses
//           fleeRate
//           maxCP
//           maxHP
//           image
//         }
//       }
//     `,
//     variables: { first: 20 },
//     fetchPolicy: "no-cache",
//   });

//   return {
//     props: { pokemons: data.pokemons },
//   };
// }
