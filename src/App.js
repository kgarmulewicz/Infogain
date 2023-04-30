import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import CustomerRewards from "./components/customerRewards";
import { getCustomers } from "./api/customers/customers.query";
import Spinner from "./components/spinner";

const App = () => {
  const startDate = useMemo(() => new Date("2023-01-01"), []);
  const endDate = useMemo(() => new Date("2023-03-31"), []);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const customersData = await getCustomers(startDate, endDate);
      if (customersData) {
        setCustomers(customersData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  }, [startDate, endDate]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(timeout);
  }, [fetchData]);

  const calculatePeriodBetweenDates = useMemo(() => {
    const fromYear = startDate.getFullYear();
    const fromMonth = startDate.getMonth();
    const toYear = endDate.getFullYear();
    const toMonth = endDate.getMonth();
    const months = [];

    for (let year = fromYear; year <= toYear; year++) {
      let monthNum = year === fromYear ? fromMonth : 0;
      const monthLimit = year === toYear ? toMonth : 11;

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
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {customers.length > 0 &&
              customers.map((customer) => (
                <CustomerRewards
                  key={customer.id}
                  customer={customer}
                  yearsAndMonths={calculatePeriodBetweenDates}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
