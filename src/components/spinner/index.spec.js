import React from "react";
import { render, screen } from "@testing-library/react";
import Spinner from "./index";

describe("Spinner Component", () => {
  test("Spinner match snapshot!", () => {
    const { view } = render(<Spinner />);
    expect(view).toMatchSnapshot();
  });
  test("renders a spinner element with 4 divs", () => {
    render(<Spinner />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeTruthy();
    const divs = screen.getAllByRole("progressbar");
    expect(divs.length).toBe(4);
  });
});
