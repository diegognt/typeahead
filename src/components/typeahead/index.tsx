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
  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

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
        <SuggestionList spacing={4}>
          {pokemons.possibleWords(deferredQuery).map((suggestion: string) => (
            <Suggestion key={suggestion}>{suggestion}</Suggestion>
          ))}
        </SuggestionList>
      ) :  null}
    </>
  );
}

export default Typeahead;
