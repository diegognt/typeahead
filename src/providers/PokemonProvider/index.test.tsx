import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PokemonProvider, usePokemon } from ".";
import { Trie } from "../../data-structure/trie";
import { Pokemon } from "../../types";

const mockData = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
];

const TestingComponent = () => {
  const pokemons = usePokemon();
  return <p>{pokemons.valueOf("ivysaur")?.name}</p>;
};

describe("The PokemonProvider", () => {
  test("renders without the 'value' prop", () => {
    render(
      <PokemonProvider>
        <div>Test</div>
      </PokemonProvider>
    );

    const div = screen.getByText("Test");
    expect(div).toHaveTextContent("Test");
  });

  test("renders with the 'value' prop", async () => {
    const trie = new Trie<Pokemon>();
    trie.insert(mockData[0].name, mockData[0]);
    trie.insert(mockData[1].name, mockData[1]);

    render(
      <PokemonProvider value={trie}>
        <div>Test</div>
      </PokemonProvider>
    );

    const div = screen.getByText("Test");
    expect(div).toHaveTextContent("Test");
  });

  test.todo("throws an error when used outside of the PokemonProvider", () => {});

  test("allows the use of the PokemonProvider by other components", () => {
    const trie = new Trie<Pokemon>();
    trie.insert(mockData[0].name, mockData[0]);
    trie.insert(mockData[1].name, mockData[1]);

    render(
      <PokemonProvider value={trie}>
        <TestingComponent />
      </PokemonProvider>
    );

    const paragraph = screen.getByText("ivysaur");
    expect(paragraph).toHaveTextContent("ivysaur");
  });
});
