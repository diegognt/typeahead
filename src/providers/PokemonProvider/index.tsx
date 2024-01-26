import { createContext, useContext, useMemo } from "react";
import { Trie } from "../../data-structure/trie";
import { Pokemon } from "../../types";

export type PokemonProviderProps = {
  children: React.ReactNode;
  value?: Trie<Pokemon>;
};

const PokemonContext = createContext<Trie<Pokemon> | undefined>(undefined);

function usePokemon() {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }

  return context;
}

function PokemonProvider(props: PokemonProviderProps) {
  const pokemons = useMemo(() => new Trie<Pokemon>(), []);

  return (
   <PokemonContext.Provider value={pokemons} {...props} />
  );
}

export { PokemonProvider, usePokemon };
