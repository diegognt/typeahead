import { describe, test, expect } from "vitest";
import { mockedPokemonList } from "../tests/mocks";
import { Trie } from "../data-structure/trie";
import { fromArrayOfPokemonsToTrie } from "./pokemons";

describe("The 'fromArrayOfPokemonsToTrie' function ", () => {
  test("returns a trie with all the pokemons in the Trie", () => {

    const trie = fromArrayOfPokemonsToTrie(mockedPokemonList);

    expect(trie).toBeDefined();
    expect(trie).toBeInstanceOf(Trie);
    expect(trie.valueOf('bulbasaur')).toEqual(mockedPokemonList[0]);
  });
});
