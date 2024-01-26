import { ChangeEvent, useState } from "react";

type InputProps = {
  name: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Input(props: InputProps) {
  const { name, placeholder = "", onChange } = props;
  const [value, setValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <input
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      type="search"
      autoComplete="off"
      className="h-14 md:h-20 transition ease-in-out dark:placeholder:text-slate-300 placeholder-zinc-700 dark:text-white text-2xl md:text-3xl block w-full rounded-md border-0 ring-0 bg-white/30 dark:bg-gray-700/30 focus:border-white focus:ring-4 focus:ring-white dark:focus:ring-gray-700"
    />
  );
}

export default Input;
