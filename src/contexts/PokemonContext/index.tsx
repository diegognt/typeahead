import { createContext, useEffect, useState } from "react";
import { Pokemon } from "../../types";
import { Trie } from "../../data-structure/trie";
import usePokemonApi from "../../hooks/use-poke-api";

const PokemonContext = createContext<Trie<Pokemon>>(new Trie());

export function PokemonProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { data, isLoading, error } = usePokemonApi();
  const [pokemons, setPokemons] = useState<Trie<Pokemon>>(new Trie<Pokemon>());

  useEffect(() => {
    if ((!data && isLoading) || error) return;

    const trie = new Trie<Pokemon>();

    data.forEach((pokemon: Pokemon) => {
      trie.insert(pokemon.name, pokemon);
    });

    setPokemons(trie);
  }, [data, isLoading, error]);

  return (
    <PokemonContext.Provider value={pokemons}>
      {children}
    </PokemonContext.Provider>
  );
}

export default PokemonContext;
