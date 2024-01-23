import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Typeahead from "./index";
import userEvent from "@testing-library/user-event";

describe("Typeahead", () => {
  test("renders", () => {
    render(<Typeahead />);
  });

  test("the search textbox is wrapped by a `form` HTML element", () => {
    render(<Typeahead />);

    const { parentElement } = screen.getByRole("searchbox");

    expect(parentElement).toBeInTheDocument();
    expect(parentElement?.tagName).toBe("FORM");
    expect(parentElement).toHaveAttribute("name", "search");
  });

  test("has a `search` HTML element as wrapper", () => {
    render(<Typeahead />);

    const wrapper = screen.getByRole("search");

    expect(wrapper).toBeInTheDocument();
  });

  test("shows a paragraph with the textbox value", async () => {
    const user = userEvent.setup();
    render(<Typeahead />);

    const input = screen.getByRole("searchbox");

    input.focus();

    await user.type(input, "pikachu");

    const paragraph = screen.getByText("pikachu");

    await waitFor(() => expect(paragraph).toBeInTheDocument());
  });
});
