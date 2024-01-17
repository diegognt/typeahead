function Typeahead() {
  return (
    <search className="w-full">
      <form className="w-full" action="#" name="search">
        <input
          className="h-14 md:h-20 transition ease-in-out dark:text-white text-2xl md:text-3xl block w-full rounded-md border-0 bg-white/30 focus:border-white focus:ring-4 focus:ring-white"
          name="typeahead"
          autoComplete="off"
          type="search"
        />
      </form>
    </search>
  );
}

export default Typeahead;
