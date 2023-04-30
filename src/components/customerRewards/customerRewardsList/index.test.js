import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import {render, screen} from '@testing-library/react'
import {customer} from '../../../mocks/customer';
import CustomerRewardsList from "./index";

describe("<CustomerRewardsList />", () => {
    const props = {
        customer 
    }
test('CustomerRewardsList match snapshot!', () => {
  const {view} = render(<CustomerRewardsList {...props} />)
  expect(view).toMatchSnapshot();
})
})

describe("CustomerRewardsList Component", () => {
    const transactions = [
      { date: "2021-01-01", amount: 100 },
      { date: "2021-02-01", amount: 200 },
      { date: "2021-03-01", amount: 300 }
    ];
  
    it("renders a table with correct number of headers", () => {
      render(<CustomerRewardsList customer={{ transactions }} />);
      const headers = screen.getAllByTestId('transactions-list-header');
      expect(headers.length).toBe(3);
    });
  
    it("renders the correct number of rows", () => {
      render(<CustomerRewardsList customer={{ transactions }} />);
      const rows = screen.getAllByTestId("transactions-list-row");
      expect(rows.length).toBe(3);
    });
  });
