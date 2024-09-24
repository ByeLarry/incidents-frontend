import { fireEvent, render, screen } from "@testing-library/react";
import { ButtonComponent } from "./button";
import { vi } from "vitest";

describe("ButtonComponent", () => {
  test("should render button", () => {
    render(<ButtonComponent>Button</ButtonComponent>);
    const button = screen.getByText("Button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Button");
    expect(button).toMatchSnapshot();
  });

  test("should render button with props", () => {
    render(
      <ButtonComponent type="button" ariaLabel="Button" modalButton>
        Button
      </ButtonComponent>
    );
    const button = screen.getByText("Button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Button");
    expect(button).toMatchSnapshot();
    expect(button).toHaveAttribute("aria-label", "Button");
    expect(button).toHaveAttribute("type", "button");
  });

  test("should render button with onClick and handle click event", () => {
    const handleClick = vi.fn();
    render(
      <ButtonComponent
        type="button"
        ariaLabel="Button"
        modalButton
        onClick={handleClick}
      >
        Button
      </ButtonComponent>
    );
    const button = screen.getByText("Button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(button).toMatchSnapshot();
  });
});
