import React, {useState, useEffect} from "react";
import { Pagination } from "./pagination";
import { PokemonPagination } from "./pokemon-pagination";
import axios from "axios"
export const Pokemon=() =>{

  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const API_URL = "https://pokeapi.co/api/v2/pokemon";
      const response = await axios.get(`${API_URL}?limit=100`);
      const pokemonData = await Promise.all(
        response.data.results.map(async (result) => {
          const pokemonResponse = await axios.get(result.url);
          return pokemonResponse.data;
        })
      );
      setPokemonList(pokemonData);
    };
    fetchPokemonList();
  }, []);



  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = pokemonList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="main-container">
      <PokemonPagination pokemons={currentPosts} loading={loading}/>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={pokemonList.length}
        paginate={paginate}
      />
    </div>
  );
}

