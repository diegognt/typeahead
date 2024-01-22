import { useState, useEffect } from 'react';
import { Pokemon } from '../types';


const URL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=300";

function usePokemonApi() {
  const [data, setData] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setData(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default usePokemonApi;
