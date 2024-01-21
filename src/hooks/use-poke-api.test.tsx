import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import usePokemonApi from "./use-poke-api";

const mockData = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
];

describe("The 'usePokeApi'", () => {
  test("should return the initial values for, 'data', 'error', 'isLoading'", async () => {
    const {
      result: {
        current: { data, error, isLoading },
      },
    } = renderHook(() => usePokemonApi());

    expect(data).toEqual([]);
    expect(error).toBe(false);
    expect(isLoading).toBe(true);
  });

  describe("and the request is successful", () => {
    const fetchSpy = vi.spyOn(window, "fetch");

    beforeEach(() => {
      const mockResolvedValue = {
        ok: true,
        json: () => new Promise((resolve) => resolve(mockData)),
      };

      fetchSpy.mockResolvedValueOnce(mockResolvedValue as Response);
    });

    afterEach(() => {
      fetchSpy.mockReset();
    });

    test("should return data", async () => {
      const { result } = renderHook(() => usePokemonApi());


      await waitFor(() => expect(result.current).toEqual({
        data: mockData,
        error: false,
        isLoading: false,
      }));
    });
  });

  describe("and the request fails", () => {
    const fetchSpy = vi.spyOn(window, "fetch");

    beforeEach(() => {
      const mockResolvedValue = {
        ok: false,
      };

      fetchSpy.mockResolvedValueOnce(mockResolvedValue as Response);
    });

    afterEach(() => {
      fetchSpy.mockReset();
    });

    test("should return the 'error' as True", async () => {
      const {        result} = renderHook(() => usePokemonApi());

      await waitFor(() => expect(result.current).toEqual({
        data: [],
        error: true,
        isLoading: false,
      }));
    });
  });
});
