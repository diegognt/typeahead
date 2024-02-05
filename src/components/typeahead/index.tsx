import { ChangeEvent, useDeferredValue, useState } from "react";
import { Trie } from "../../data-structure/trie";
import { usePokemon } from "../../providers/PokemonProvider";
import { Pokemon } from "../../types";
import Input from "../Input";
import { Suggestion, SuggestionList } from "../Suggestions";

function Typeahead() {
  const pokemons: Trie<Pokemon> = usePokemon();
  const [query, setQuery] = useState<string>("");
  const deferredQuery = useDeferredValue<string>(query);
  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    if ( e.target.value.length < 2 ) {
      setQuery("");
      return;
    }

    setQuery(e.target.value);

  }

  return (
    <>
      <search role="search" className="w-full">
        <form className="w-full" action="#" name="search">
          <Input
            name="search"
            placeholder="Search"
            onChange={handleUserInput}
          />
        </form>
      </search>
      {pokemons.possibleWords(deferredQuery).length > 0 ? (
        <SuggestionList spacing={2}>
          {pokemons.possibleWords(deferredQuery).map((suggestion: string) => (
            <Suggestion key={suggestion}>
              <button className="w-full h-16 bg-gray-200/30 text-gray-900 text-left pl-5 rounded-md hover:shadow-md hover:bg-gray-200 focus:shadow-md focus:bg-gray-200 focus:outline-white focus:outline-1 focus:outline-offset-4">{suggestion}</button>
            </Suggestion>
          ))}
        </SuggestionList>
      ) :  null}
    </>
  );
}

export default Typeahead;
