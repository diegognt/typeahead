import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import Typeahead from "./index";


describe("Typeahead", () => {

  afterEach(() => cleanup());

  test("renders", () => {
    render(<Typeahead />);
  });

  test("renders an search textbox", () => {
    render(<Typeahead />);

    const searchbox = screen.getByRole("searchbox");

    expect(searchbox).toBeInTheDocument();
    expect(searchbox).toHaveAttribute("name", "typeahead");
  });

  test("the search textbox is wrapped by a `form` HTML element", () => {
    render(<Typeahead />);

    const { parentElement } = screen.getByRole("searchbox");

    expect(parentElement).toBeInTheDocument();
    expect(parentElement?.tagName).toBe("FORM");
    expect(parentElement).toHaveAttribute("name", "search");
  });

  test("has a `search` HTML element as wrapper", () => {
    const { container } = render(<Typeahead />);

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild?.nodeName).toBe("SEARCH");
  });
});

