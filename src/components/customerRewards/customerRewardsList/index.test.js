import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import {render} from '@testing-library/react'
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
