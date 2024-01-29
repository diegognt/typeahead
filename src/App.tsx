import { ErrorBoundary } from "react-error-boundary";
import Typeahead from "./components/Typeahead";
import { PokemonProvider } from "./providers/PokemonProvider";
import { useEffect } from "react";
import usePokemonApi from "./hooks/use-poke-api";
import { fromArrayOfPokemonsToTrie } from "./utilities/pokemons";


function App() {
  const {data, error} = usePokemonApi();

  useEffect(() => {
    if (error) return;
  }, [error]);
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <PokemonProvider value={fromArrayOfPokemonsToTrie(data)}>
        <article className="w-full font-mono">
          <h1 className="text-5xl leading-tight md:text-6xl mb-10 md:mb-16 text-center text-white dark:text-gray-700">
            A random Typeahead
          </h1>
          <Typeahead />
        </article>
      </PokemonProvider>
    </ErrorBoundary>
  );
}

export default App;
