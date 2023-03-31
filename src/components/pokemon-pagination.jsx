import React, { useState } from "react";
import "./styles/pokemon-pagination.css";

export const PokemonPagination = ({ pokemons, loading }) => {
  const [query, setQuery] = useState("");
  if (loading) {
    return <h2>Loading...</h2>;
  }

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const filteredPokemonList = pokemons.filter((pokemons) =>
    pokemons.name.includes(query.toLowerCase())
  );

  return (
    <div className="pokemon-pagination-main-container">
      <h2>Pokemon List</h2>
      <input
      className="search"
        type="text"
        placeholder="Search..."
        onChange={(e) => handleSearch(e)}
      />
      <ul>
        {filteredPokemonList.map((pokemon) => {
          const id = pokemon.id;
          return (
            <li className = "pokemon"key={id}>
              <div className="pokemon-list">
                <span>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    alt={pokemon.name}
                  />
                </span>
                <span>
                  <h3 className="pokemon-name">{pokemon.name}</h3>
                  <p>
                    Height: <span className="pokemon-height">{pokemon.height / 10} m</span>
                    Weight: <span className="pokemon-weight">{pokemon.weight / 10} kg</span>
                  </p>
                
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
