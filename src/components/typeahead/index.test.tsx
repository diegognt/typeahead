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
import { mockedPokemonList } from "../../tests/mocks";


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

  test("does not show a list of suggestion when user type less than two characters", async () => {
    const user = userEvent.setup();
    renderWithPokemonProvider(<Typeahead />, {}, mockedPokemonList);

    const input = screen.getByRole("searchbox");

    input.focus();

    await act(async () => user.type(input, "b"));

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("shows a list of suggestion as user type more than three characters", async () => {
    const user = userEvent.setup();
    renderWithPokemonProvider(<Typeahead />, {}, mockedPokemonList);

    const input = screen.getByRole("searchbox");

    input.focus();

    await act(async () => user.type(input, "b"));
    await act(async () => user.type(input, "u"));

    expect(await screen.findByRole("list")).toBeInTheDocument();
    expect(await screen.findAllByRole("listitem")).toHaveLength(2);
    expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
    expect(await screen.findByText(/butterfree/i)).toBeInTheDocument();
  });
});
