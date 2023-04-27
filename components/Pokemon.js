import React from "react";
import Link from "next/link";

function Pokemon({ pokemon }) {
  return (
    <div className="col-lg-3 mb-2">
   
      <div className="card h-100 card-sm small " style={{margin: '0'}}>
        <Link href={`/pokemons/${pokemon.id}`} passHref>
          
            <div className="card-img-top small p-4 " style={{height: '250px', overflow:"hidden"}}>
              <img src={pokemon.image} alt={pokemon.name} className="img-fluid" style={{ maxHeight: "80%", maxWidth: "80%", objectFit: "cover" }} />
            </div>
          
        </Link>
        <div className="card-body">
          <h5 className="card-title">
            {pokemon.name} ({pokemon.number})
          </h5>
          <div className="card-text">
            {pokemon.types.length === 2 ? (
              <>
                <span className="badge bg-secondary me-1 rounded-pill" >{pokemon.types[0]}</span>
                <span className="badge bg-secondary me-1 rounded-pill">{pokemon.types[1]}</span>
              </>
            ) : (
              <span className="badge bg-secondary me-1 rounded-pill">{pokemon.types[0]}</span>
            )}
          </div>
        </div>
      </div>
    </div>
 
    
  );
}

export default Pokemon;
