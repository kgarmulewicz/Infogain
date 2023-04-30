import { monthNames } from "../utils";

export const calculateSingleTransactionRewardsAmount = (transaction) => {
  let rewardPoints = 0;
  if (transaction > 50 && transaction <= 100) {
    rewardPoints = rewardPoints + (transaction - 50);
  } else if (transaction > 100) {
    rewardPoints = rewardPoints + (2 * (transaction - 100) + 50);
  }
  return rewardPoints;
};

export const remapData = (customer, yearsAndMonths) => {
  const tempTransactions = [];
  yearsAndMonths.forEach((date) => {
    const tempAmounts = [];
    customer.transactions.forEach((transaction) => {
      if (
        transaction.date.getMonth() === date.month - 1 &&
        transaction.date.getFullYear() === date.year
      ) {
        tempAmounts.push(transaction.amount);
      }
    });
    if (date?.month && tempAmounts.length) {
      tempTransactions.push({
        name: monthNames[date.month - 1],
        transactions: tempAmounts,
      });
    }
  });
  return tempTransactions;
};
