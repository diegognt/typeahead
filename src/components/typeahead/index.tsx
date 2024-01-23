import {
  ChangeEvent,
  useDeferredValue,
  useState,
} from "react";
import Input from "./Input";

function Typeahead() {
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
      <p className="text-white">{deferredQuery}</p>
    </>
  );
}

export default Typeahead;
