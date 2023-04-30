import React, { useEffect, useMemo, useState } from "react";
import './index.css';
import CustomerRewardsList from "./customerRewardsList";
import {
  calculateSingleTransactionRewardsAmount,
  remapData,
} from "./customerRewards.utils";

const CustomerRewards = ({ customer, yearsAndMonths }) => {
  const [rewardsPerMonths, setRewardsPerMonths] = useState([]);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  useEffect(() => {
    setRewardsPerMonths(remapData(customer, yearsAndMonths));
  }, []);

  const calculateRewardAmounts = useMemo(() => {
    const customerRewards = [];
    rewardsPerMonths?.forEach((payment) => {
      let monthRewards = 0;
      payment.transactions.forEach((transaction) => {
        monthRewards =
          monthRewards + calculateSingleTransactionRewardsAmount(transaction);
      });
      customerRewards.push({
        ...payment,
        monthRewards,
      });
    });
    return customerRewards;
  }, [rewardsPerMonths]);

  const calculateTotalRewardsAmount = useMemo(() => {
    let totalRewards = 0;
    calculateRewardAmounts.forEach((month) => {
      totalRewards = totalRewards + month.monthRewards;
    });
    return totalRewards;
  }, [calculateRewardAmounts]);

  return (
    <div className="single-customer">
      <div className="transactions-container">
        <div
          className={
            isDetailsVisible
              ? "customer-container-active"
              : "customer-container"
          }
          onClick={() => setIsDetailsVisible(!isDetailsVisible)}
        >
          <div className="customer-details">
            {`${customer.firstName} ${customer.lastName}`}
          </div>
          <div className="customer-total-rewards">
            {`Total Rewards: ${calculateTotalRewardsAmount}`}
          </div>
        </div>
        <div
          className="panel"
          style={{ display: isDetailsVisible ? "block" : "none" }}
        >
          Customer transactions summary:
          <div className="months-summary">
            {calculateRewardAmounts.map((month) => (
              <div className="month-container">
                <div className="month-name">{month.name}:</div>
                <div>{month.monthRewards}</div>
              </div>
            ))}
          </div>
          <CustomerRewardsList customer={customer} />
        </div>
      </div>
    </div>
  );
};

export default CustomerRewards;
