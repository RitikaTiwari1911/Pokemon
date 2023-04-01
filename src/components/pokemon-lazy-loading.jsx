import React, { useEffect, useState, useRef } from "react";
import "./styles/pokemon-pagination.css";
import axios from "axios";

export const PokemonLazyLoading = () => {
  const [query, setQuery] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);

  const observer = useRef(null);

  useEffect(() => {
    // fetches the initial list of Pokemon data from the PokeAPI on component mount
    const fetchPokemonList = async () => {
      setLoading(true);
      const API_URL = "https://pokeapi.co/api/v2/pokemon";
      const response = await axios.get(`${API_URL}?limit=20`);
      const pokemonData = await Promise.all(
        response.data.results.map(async (result) => {
          const pokemonResponse = await axios.get(result.url);
          return pokemonResponse.data;
        })
      );
      setPokemonList(pokemonData);
      setNextPage(response.data.next);
      setLoading(false);
    };
    fetchPokemonList();
  }, []);

  useEffect(() => {
    // sets up an IntersectionObserver to detect when the "loadMoreRef" element is intersecting the viewport,
    // which triggers the fetchMoreData function to be called
    if (loading) return;

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && nextPage) {
        loadMore();
      }
    });

    observer.current.observe(document.querySelector(".loading"));
  }, [loading, nextPage]);

  const loadMore = async () => {
    setLoading(true);
    const response = await axios.get(nextPage);
    const pokemonData = await Promise.all(
      response.data.results.map(async (result) => {
        const pokemonResponse = await axios.get(result.url);
        return pokemonResponse.data;
      })
    );
    setPokemonList([...pokemonList, ...pokemonData]);
    setNextPage(response.data.next);
    setLoading(false);
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.includes(query.toLowerCase())
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
            <li className="pokemon" key={id}>
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
                    Height:{" "}
                    <span className="pokemon-height">
                      {pokemon.height / 10} m
                    </span>
                    Weight:{" "}
                    <span className="pokemon-weight">
                      {pokemon.weight / 10} kg
                    </span>
                  </p>
                </span>
              </div>
            </li>
          );
        })}
        <div className="loading">{loading && "Loading..."}</div>
      </ul>
    </div>
  );
};
