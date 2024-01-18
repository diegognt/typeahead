import Typeahead from "./components/typeahead";

function App() {
  return (
    <article className="w-full font-mono">
      <h1 className="text-5xl leading-tight md:text-6xl mb-10 md:mb-16 text-center text-white dark:text-gray-700">A random Typeahead</h1>
      <Typeahead />
    </article>
  );
}

export default App;
