import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import { customer } from "../../mocks/customer";
import { yearsAndMonths } from "../../mocks/yearsAndMonths";
import CustomerRewards from "./index";
import {calculateSingleTransactionRewardsAmount, remapData} from './customerRewards.utils';

describe("<CustomerRewards />", () => {
  const props = {
    customer,
    yearsAndMonths,
  };
  test("CustomerRewards match snapshot!", () => {
    const { view } = render(<CustomerRewards {...props} />);
    expect(view).toMatchSnapshot();
  });

  test("CustomerRewards calculation method", () => {
    const value = calculateSingleTransactionRewardsAmount(136);
    expect(value).toBe(122);
  });

  test("CustomerRewards maping method", () => {
    const response = remapData(props.customer, props.yearsAndMonths);
    const expectedResponse = [{"name": "January", "transactions": [276, 1, 95, 209, 134, 174, 231, 246, 177, 128]}, {"name": "February", "transactions": [142, 191, 256, 67, 75, 130]}, {"name": "March", "transactions": [79, 186, 44, 209, 88, 215, 152, 279]}];
    expect(response).toStrictEqual(expectedResponse);
  });
});
