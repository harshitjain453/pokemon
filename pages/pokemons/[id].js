import React ,{useState} from "react";
import {useNavigate} from "react-router-dom"
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {AiFillCloseCircle } from 'react-icons/ai';
import { useRouter } from "next/router";


export default  function PokemonDetail({ pokemon }) {
  const router=useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [evolution, setevolution] = useState(null);
  // const [toggelSidebar,setToggelSidebar] = useState
  // (false); 
  const {id, image } = pokemon;
  console.log(image,id);
  
  const client =  new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
    cache: new InMemoryCache(),
  });
 
  const handlePopup = async() => {
    const { data } = await  client.query({
      query: gql`
      query pokemon($id: String, $name: String){
        pokemon(id: $id, name: $name){
          id
          name
          evolutions{
            id
            number
            name
            classification
            types
            resistant
            weaknesses
            fleeRate
            maxCP
            evolutions{
              id
              number
              name
              classification
              types
              resistant
              weaknesses
              fleeRate
              maxCP
              evolutions{
                id
                number
                name
                classification
                types
                resistant
                weaknesses
                fleeRate
                maxCP
                maxHP
                image
              }
              maxHP
              image
            }
            maxHP
            image
          }
        }
      }`,
      variables: { id },
      fetchPolicy: "no-cache",
    });
    //  evolutions=data.pokemon.evolutions;
  

    setevolution(data.pokemon.evolutions);
    setShowPopup(!showPopup);
  };
 
  
  // const showEvolutionImage= async (evolutionImageUrl)=> {
  //   const popupContainer = document.getElementById('evolution-popup');
  //   popupContainer.style.padding="25px"
  //   const imageElement = document.createElement('img');
  //   imageElement.style.objectFit = 'cover'; // or 'contain', 'fill', etc.
  //   imageElement.style.maxWidth = '20%';
  //   imageElement.style.maxHeight = '40%';
  //   imageElement.style.width=""
  //   imageElement.src = evolutionImageUrl;

    
  //   popupContainer.appendChild(imageElement);
  //   document.getElementById('evolve-button').disabled=true;
   
  // };
  // const handleEvolutionClick = async (e) => {
  
   
  //   const evolveButton = document.getElementById('evolve-button');
  //   let  evolutionImageUrl="";
  //  evolveButton.addEventListener('click', async () =>{
      
     
    
      
  //    await  data.pokemon.evolutions.forEach(evolve => {
  //        evolutionImageUrl =evolve.image; // Replace with the URL of the actual evolution image
  //       showEvolutionImage(evolutionImageUrl);
       
  //     });
  //     setToggelSidebar(true);
  //   });
  // };
  // const router=useRouter();
  // if(router.isFallback){
  //   <h1>loading ....</h1>
  // }
  
 
  return (
    <>
      <ApolloProvider client={client}>
       <div className="main_container container position-relative">
       
        <div className="container my-4 bg-light">
         <button className="btn btn-light" onClick={() => router.push('/pokemons')} ><FaArrowLeft fontSize={30}/></button> 
          <div className="row">
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="img-fluid rounded"
                style={{ objectFit: "cover" }}
              />
            </div>
            
            <div className="col-md-6">
              
              <div className="my-4">
              <h1 className="display-3">{pokemon.name}</h1>
                
                <div className="row">
                <div
                  className="d-flex flex-row  rounded justify-content-evenly align-items-center p-1"
                  style={{ backgroundColor: "lightblue" }}
                >
                  <h2
                    className="d-flex flex-row col-md-6 justify-content-evenly align-items-center  "
                    style={{ fontSize: "25px" }}
                  >
                    Height:{" "}
                    {Math.round(parseFloat(pokemon.height.minimum) * 39.3701)} Inchs
                  </h2>
                  <h2
                    className="d-flex flex-row col-md-6 justify-content-evenly align-items-center"
                    style={{ fontSize: "25px" }}
                  >
                    Weight:{" "}
                    {Math.round(parseFloat(pokemon.weight.minimum) * 2.20462)}{" "}
                    lbs
                  </h2>
                </div>

              </div>
            
                <div className="my-4 "  >
                   <h3>Type</h3>
                     {pokemon.types.map((type) => (
                          <span key={type} className=" badge bg-primary me-2  ">  
                         {type}
                    </span>
                  ))}
                </div>
                <div className="my-4">
                  <h3>Resistant to:</h3>
                  {pokemon.resistant.map((type) => (
                    <span key={pokemon.type} className="badge bg-success me-2">
                      {type}
                    </span>
                  ))}
                </div>
                <div className="my-4">
                  <h3>Weak against:</h3>
                  {pokemon.weaknesses.map((type) => (
                    <span key={type} className="badge bg-danger me-2">
                      {type}
                    </span>
                  ))}
                </div>
                <div className="my-4">
                  <h3>Classification: {pokemon.classification}</h3>
                </div>
              </div>
              <button id="evolve-button" className="btn btn-lg btn-primary" onClick={handlePopup}>Evolve</button>
             
            </div>
          </div>
         
         
        </div>
        {showPopup && <div className=" container bg-light z-index-5 shadow-lg position-absolute top-50 ">
        <AiFillCloseCircle fontSize={30} style={{cursor:"pointer"}} onClick={handlePopup}/>
        
          <div id="evolution-popup"  className=" d-flex justify-content-evenly align-items-center ">
          <FaArrowRight fontSize={30} className="d-flex align-items-center justify-content-center"/>
          {evolution === null ? (
            <div className="icon">
           <h1 className="p-4"> There is no evolution beyond this</h1>
    </div>
) : (
  evolution.map((evolution) => (
    <div className="icon">
      <img
        src={evolution.image}
        alt={evolution.name}
        style={{ objectFit: "cover", maxHeight: "50%", maxWidth: "50%" }}
      />
      <FaArrowRight fontSize={30} style={{ margin: "100px" }} />
    </div>
  ))
)}
    
          </div>
           
          </div>}
          </div>
      </ApolloProvider>
    </>
  );
}

export async function getStaticPaths() {
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
    variables: { first: 151},
    fetchPolicy: "no-cache",
  });

  const paths = data.pokemons.map((pokemon) => ({
    params: { id: pokemon.id },
  }));
  // console.log(data.pokemons.length);

  return { paths, fallback:'blocking'};
  
}

export async function getStaticProps(context) {
  const { params } = context;
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query pokemon($id: String, $name: String) {
        pokemon(id: $id, name: $name) {
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
    variables: { id: params.id },
    fetchPolicy: "no-cache",
  });

  return { props: { pokemon: data.pokemon } };
}
