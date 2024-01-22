import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import PokemonContext, { PokemonProvider } from ".";
import * as PokemonApiHook from "../../hooks/use-poke-api";

const mockData = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
];

const TestingComponent = () => {
  const pokemons = useContext(PokemonContext);
  return <p>{pokemons.valueOf("ivysaur")?.name}</p>;
};

describe("The PokemonProvider", () => {
  const mockedUsePokemonApi = vi.spyOn(PokemonApiHook, "default");

  beforeEach(() => {
    mockedUsePokemonApi.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: false,
    });
  });

  afterEach(() => {
    mockedUsePokemonApi.mockReset();
  });

  test("should be rendered", () => {
    render(
      <PokemonProvider>
        <div>Test</div>
      </PokemonProvider>
    );

    const div = screen.getByText("Test");
    expect(div).toHaveTextContent("Test");
  });

  test("should provide the pokemons", async () => {
    render(
      <PokemonProvider>
        <TestingComponent />
      </PokemonProvider>
    );

    const p = await screen.findByText("ivysaur");

    expect(p).toBeInTheDocument();
    expect(p).toHaveTextContent("ivysaur");
  });
});
