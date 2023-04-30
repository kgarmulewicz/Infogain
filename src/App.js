import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import CustomerRewards from "./components/customerRewards";
import { getCustomers } from "./api/customers/customers.query";

const App = () => {
  const startDate = useMemo(() => new Date("2023-01-01"), []);
  const endDate = useMemo(() => new Date("2023-03-31"), []);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const test = await getCustomers(startDate, endDate);
        if (test) {
          setCustomers(test);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.info("customers", customers);
  }, [customers]);

  const calculateCustomersRewards = useCallback(() => {
    const customersRewards = [];
    customers.forEach((customer) => {
      let totalRewards = 0;
      customer.transactions.forEach((transaction) => {
        if (transaction.amount > 50 && transaction.amount <= 100) {
          totalRewards += transaction.amount - 50;
        } else if (transaction.amount > 100) {
          totalRewards += 2 * (transaction.amount - 100) + 50;
        }
      });
      customersRewards.push({
        ...customer,
        totalRewards,
      });
    });
    return customersRewards;
  }, [customers]);

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", { month: "long" });
  };

  const calculatePeriodBetweenDates = useMemo(() => {
    const fromYear = startDate.getFullYear();
    const fromMonth = startDate.getMonth();
    const toYear = endDate.getFullYear();
    const toMonth = endDate.getMonth();
    const months = [];

    for (let year = fromYear; year <= toYear; year++) {
      let monthNum = year === fromYear ? fromMonth : 0;
      const monthLimit = year === toYear ? toMonth : 11;

      const index = months.indexOf((dateYear) => dateYear === year);
      if (index === -1) {
        months.push(year);
      }

      for (; monthNum <= monthLimit; monthNum++) {
        let month = monthNum + 1;
        months.push({ year, month });
      }
    }
    return months;
  }, [startDate, endDate]);

  return (
    <div className="App">
      <div className="customers-container">
        {customers.length > 0 &&
          customers.map((customer) => (
            <CustomerRewards
              customer={customer}
              yearsAndMonths={calculatePeriodBetweenDates}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
