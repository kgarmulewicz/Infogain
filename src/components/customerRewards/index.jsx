import React, { useEffect, useMemo, useState } from "react";
import "./index.css";
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
  }, [customer, yearsAndMonths]);

  const calculateRewardAmounts = useMemo(() =>
    rewardsPerMonths?.map(({ name, transactions }) => ({
      name,
      monthRewards: transactions.reduce((acc, transaction) =>
        acc + calculateSingleTransactionRewardsAmount(transaction), 0)
    })),
    [rewardsPerMonths],
  );

  const calculateTotalRewardsAmount = useMemo(
    () =>
      calculateRewardAmounts.reduce(
        (acc, { monthRewards }) => acc + monthRewards,
        0
      ),
    [calculateRewardAmounts]
  );

  const toggleDetailsVisibility = () => setIsDetailsVisible(prevState => !prevState);

  return (
    <div data-testid="customer-rewards" className="single-customer">
      <div className="transactions-container">
        <div
          className={
            isDetailsVisible
              ? "customer-container-active"
              : "customer-container"
          }
          onClick={toggleDetailsVisibility}
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
              <div key={month.name} className="month-container">
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
