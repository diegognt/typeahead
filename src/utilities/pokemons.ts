import { Trie } from "../data-structure/trie";
import { Pokemon } from "../types";

export const fromArrayOfPokemonsToTrie = (pokemons: Pokemon[]) => {
  const trie = new Trie<Pokemon>();

  pokemons.forEach((pokemon) => trie.insert(pokemon.name, pokemon));

  return trie;
}
