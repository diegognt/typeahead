import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import usePokemonApi from "./use-poke-api";
import { act, renderHook } from "@testing-library/react";

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
      let result;

      await act(async () => {
        result = renderHook(() => usePokemonApi());
      });

      const { data, error, isLoading } = result!.result.current;

      expect(data).toEqual(mockData);
      expect(error).toBe(false);
      expect(isLoading).toBe(false);
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
      let result;

      await act(async () => {
        result = renderHook(() => usePokemonApi());
      });

      const { data, error, isLoading } = result!.result.current;

      expect(data).toEqual([]);
      expect(error).toBe(true);
      expect(isLoading).toBe(false);
    });
  });
});
