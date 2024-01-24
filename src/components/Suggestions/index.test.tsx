import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { Suggestion, SuggestionList } from ".";

// TODO: Make sure to test in the future the following:
//   - The SuggestionList throws an error if the children are not Suggestion components
//   - The SuggestionList component only renders the Suggestion component

describe("The Suggestions component", () => {
  test("renders correctly", () => {
    render(<SuggestionList>
      <li>Item 1</li>
    </SuggestionList>);

    const suggestions = screen.getAllByRole("list");

    expect(suggestions[0]).toBeInTheDocument();
  });

  test("have a spacing of 2 by default", () => {
    render(<SuggestionList>
      <li>Item 1</li>
    </SuggestionList>);

    const suggestions = screen.getAllByRole("list");

    expect(suggestions[0]).toHaveClass("gap-2");
  });

  test("have a spacing of 4", () => {
    render(<SuggestionList spacing={4}>
      <li>Item 1</li>
    </SuggestionList>);

    const suggestions = screen.getAllByRole("list");

    expect(suggestions[0]).toHaveClass("gap-4");
  });

  test("should have at least one 'li' children", () => {
    render(<SuggestionList>
      <li>Item 1</li>
    </SuggestionList>);

    const suggestions = screen.getAllByRole("listitem");

    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions[0]).toHaveTextContent("Item 1");
  });
});


describe("The Suggestion component", () => {
  test("renders correctly inside a 'SuggestionList' component", () => {
    render(<SuggestionList>
      <Suggestion>Item 1</Suggestion>
    </SuggestionList>);

    const suggestion = screen.getByRole("listitem");

    expect(suggestion).toBeInTheDocument();
    expect(suggestion).toHaveTextContent("Item 1");
  });

  test("renders correctly two Suggestion inside the 'SuggestionList' component", () => {
    render(<SuggestionList>
      <Suggestion>Item 1</Suggestion>
      <Suggestion>Item 2</Suggestion>
    </SuggestionList>);

    const suggestions = screen.getAllByRole("listitem");

    expect(suggestions.length).toBeGreaterThan(1);
    expect(suggestions[0]).toHaveTextContent("Item 1");
    expect(suggestions[1]).toHaveTextContent("Item 2");
  });

});
