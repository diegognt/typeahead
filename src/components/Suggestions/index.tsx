import { Children, ReactNode } from "react";

// TODO: Make sure in the future of the following:
//   - The SuggestionList throws an error if the children are not a Suggestion component/s
//   - The SuggestionList component only renders the Suggestion component


type SuggestionListProps = {
  children: ReactNode;
  spacing?: 0 | 2 | 4 | 6 | 8 | 10;
};

type SuggestionProps = {
  children: ReactNode;
};

export function SuggestionList(props: SuggestionListProps) {
  const { children, spacing = 2 } = props;

  return (
    <ul className={`flex flex-col gap-${spacing} pt-${spacing} h-96`}>
      {Children.map(children, (child) => {
        return child;
      })}
    </ul>
  );
}

export function Suggestion(props: SuggestionProps) {
  const { children } = props;

  return <li>{children}</li>;
}
