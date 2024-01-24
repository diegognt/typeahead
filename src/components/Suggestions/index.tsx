import { ReactElement } from "react";

type SuggestionListProps = {
  children: ReactElement<HTMLLIElement | HTMLLIElement[]>;
};

export function SuggestionList(props: SuggestionListProps): JSX.Element {
  const { children } = props;

  if (children.type !== "li") {
    throw new Error("SuggestionList only accepts 'li' elements as children");
  }

  return <ul>{children}</ul>;
}
