import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { SuggestionList } from ".";

describe("The Suggestions component", () => {
  test("renders correctly", () => {
    render(<SuggestionList>
      <li>Item 1</li>
    </SuggestionList>);

    const suggestions = screen.getByRole("list");

    expect(suggestions).toBeInTheDocument();
  });

  test("trhows an error if children are not 'li' elements", () => {
    expect(() => {
      render(<SuggestionList>
        <div>Item 1</div>
      </SuggestionList>);
    }).toThrowError("SuggestionList only accepts 'li' elements as children");
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


describe.skip("The Suggestion component", () => {});
