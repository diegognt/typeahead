import { RenderOptions, act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import { describe, expect, test } from "vitest";
import Typeahead from ".";
import { Trie } from "../../data-structure/trie";
import {
  PokemonProvider,
  PokemonProviderProps,
} from "../../providers/PokemonProvider";
import { Pokemon } from "../../types";

const mockedPokemonList = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
  { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
  { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
  { name: "charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/" },
  { name: "charizard", url: "https://pokeapi.co/api/v2/pokemon/6/" },
  { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
  { name: "wartortle", url: "https://pokeapi.co/api/v2/pokemon/8/" },
  { name: "blastoise", url: "https://pokeapi.co/api/v2/pokemon/9/" },
  { name: "caterpie", url: "https://pokeapi.co/api/v2/pokemon/10/" },
  { name: "metapod", url: "https://pokeapi.co/api/v2/pokemon/11/" },
  { name: "butterfree", url: "https://pokeapi.co/api/v2/pokemon/12/" },
  { name: "weedle", url: "https://pokeapi.co/api/v2/pokemon/13/" },
  { name: "kakuna", url: "https://pokeapi.co/api/v2/pokemon/14/" },
  { name: "beedrill", url: "https://pokeapi.co/api/v2/pokemon/15/" },
];

const renderWithPokemonProvider = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
  pokemons?: Pokemon[]
) => {
  const trie = new Trie<Pokemon>();
  pokemons = pokemons ?? [];

  for (const pokemon of pokemons) {
    trie.insert(pokemon.name, pokemon);
  }

  const Wrapper = (props: PokemonProviderProps) => (
    <PokemonProvider value={trie} {...props} />
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

describe("The Typeahead", () => {
  test("renders inside the PokemonProvider", () => {
    renderWithPokemonProvider(<Typeahead />);
  });

  test.skip("throws an error when used outside of the PokemonProvider", () => {
    expect(() => render(<Typeahead />)).toThrowError(
      "usePokemon must be used within a PokemonProvider"
    );
  });

  test("does not show a list of suggestion when user is not typing", async () => {
    renderWithPokemonProvider(<Typeahead />, {}, mockedPokemonList);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("shows a list of suggestion as user type", async () => {
    const user = userEvent.setup();
    renderWithPokemonProvider(<Typeahead />, {}, mockedPokemonList);

    const input = screen.getByRole("searchbox");

    input.focus();

    await act(async () => user.type(input, "b"));

    expect(await screen.findByRole("list")).toBeInTheDocument();
    expect(await screen.findAllByRole("listitem")).toHaveLength(4);
    expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
    expect(await screen.findByText(/blastoise/i)).toBeInTheDocument();
    expect(await screen.findByText(/butterfree/i)).toBeInTheDocument();
    expect(await screen.findByText(/beedrill/i)).toBeInTheDocument();

    // await waitForElementToBeRemoved(screen.queryByText(/bulbasaur/i));
    // await waitForElementToBeRemoved(screen.queryByText(/blastoise/i));
    // await waitForElementToBeRemoved(screen.queryByText(/butterfree/i));

    await act(async () => user.type(input, "e"));

    expect(await screen.findAllByRole("listitem")).toHaveLength(1);
    expect(await screen.findByText(/beedrill/i)).toBeInTheDocument();
  });
});
