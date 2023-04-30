import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import Spinner from './index';

describe("<Spinner />", () => {
  test("Spinner match snapshot!", () => {
    const { view } = render(<Spinner />);
    expect(view).toMatchSnapshot();
  });
});
