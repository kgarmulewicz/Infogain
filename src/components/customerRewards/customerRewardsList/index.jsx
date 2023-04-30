import React from "react";
import './index.css';
import { formatDate } from "../../utils";
import { calculateSingleTransactionRewardsAmount } from "../customerRewards.utils";

const CustomerRewardsList = ({ customer }) => {
  return (
    <table className="transactions-list">
      <tr>
        <th>Transaction date</th>
        <th>Spent amount</th>
        <th>Reward points</th>
      </tr>
      {customer.transactions.map((transaction) => (
        <tr>
          <td>{formatDate(transaction.date)}</td>
          <td>${transaction.amount}</td>
          <td>{calculateSingleTransactionRewardsAmount(transaction.amount)}</td>
        </tr>
      ))}
    </table>
  );
};

export default CustomerRewardsList;
