import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Pokemon } from "./components/pokemon";
import { PokemonLazyLoading } from "./components/pokemon-lazy-loading";
import { Navbar } from "./components/Common/navbar";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Pokemon />} />
        <Route path="/lazy-loading" element={<PokemonLazyLoading />} />
      </Routes>
    </Router>
  );
}

export default App;
