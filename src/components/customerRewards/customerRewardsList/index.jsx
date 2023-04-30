import React from "react";
import PropTypes from 'prop-types';
import "./index.css";
import { formatDate } from "../../utils";
import { calculateSingleTransactionRewardsAmount } from "../customerRewards.utils";

const CustomerRewardsList = ({ customer: { transactions } }) => {
  const rewardsAmounts = transactions.map(({ amount }) =>
    calculateSingleTransactionRewardsAmount(amount)
  );

  return (
    <table className="transactions-list">
      <thead>
        <tr>
          <th data-testid="transactions-list-header">Transaction date</th>
          <th data-testid="transactions-list-header">Spent amount</th>
          <th data-testid="transactions-list-header">Reward points</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(({ date, amount }, index) => (
          <tr data-testid="transactions-list-row" key={date}>
            <td>{formatDate(date)}</td>
            <td>${amount}</td>
            <td>{rewardsAmounts[index]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerRewardsList;

CustomerRewardsList.propTypes = {
  customer: PropTypes.object,
};
