import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import Input from ".";

const props = {
  name: "search",
};

describe("The input component", () => {
  test("renders a search input", () => {
    render(<Input {...props} />);

    const input = screen.getByRole("searchbox");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", props.name);
    expect(input).toHaveAttribute("autoComplete", "off");
  });

  test("renders an input with a placeholder when provided", () => {
    const placeholder = "Search";

    render(<Input {...props} placeholder={placeholder} />);

    const input = screen.getByPlaceholderText(placeholder);

    expect(input).toBeInTheDocument();
  });

  test("executes a provided 'onChange' callback when the input changes", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Input {...props} onChange={onChange} />);

    const input = screen.getByRole("searchbox");

    await user.type(input, "a");

    expect(onChange).toHaveBeenCalled();
  });

  test("updates the input value as the user types", async () => {
    const user = userEvent.setup();

    render(<Input {...props} />);

    const input = screen.getByRole("searchbox");

    await user.type(input, "a");

    expect(input).toHaveValue("a");

    await user.type(input, "b");

    expect(input).toHaveValue("ab");

    await user.type(input, "c");

    expect(input).toHaveValue("abc");
  });
});
