import { screen, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import Dialog from ".";

describe("The Dialog component", () => {
  const targetContainer = document.createElement("div");

  beforeEach(() => {
    targetContainer.id = "portal-root";
    document.body.appendChild(targetContainer);
  });

  afterEach(() => {
    document.body.removeChild(targetContainer);
  });

  test("renders a dialog element that is closed by default", () => {
    render(<Dialog>The dialog content</Dialog>);
    const dialog = screen.getByRole("dialog", { hidden: true });

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent("The dialog content");
  });

  test("renders a dialog element that can be opened", () => {
    render(<Dialog isOpen>The dialog content</Dialog>);
    const dialog = screen.getByRole("dialog");

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent("The dialog content");
  });

  test("renders a button that can close the dialog element", async () => {
    render(<Dialog isOpen>The dialog content</Dialog>);
    const dialog = screen.getByRole("dialog", { hidden: false });
    const closeButton = screen.getByRole("button", {
      name: "Close the dialog",
    });

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent("The dialog content");

    closeButton.click();

    expect(
      await screen.findByRole("dialog", { hidden: true })
    ).toBeInTheDocument();
  });

  test("calls the 'onClose' prop when the dialog is about to be closed", async () => {
    const handleClose = vi.fn();

    render(
      <Dialog isOpen onClose={handleClose}>
        The dialog content
      </Dialog>
    );

    const dialog = screen.getByRole("dialog", { hidden: false });
    const closeButton = screen.getByRole("button", {
      name: "Close the dialog",
    });

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent("The dialog content");

    closeButton.click();

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
