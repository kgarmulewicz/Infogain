const fetchCustomers = async () => {
  try {
    const response = await fetch("customers.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const customers = await response.json();
    return customers;
  } catch (error) {
    console.error(error);
  }
};

const randomAmount = () => {
  return Math.floor(Math.random() * 301);
};

const generateRandomPurchaseDate = (startDate, endDate) => {
  const tempArrayData = [];
  while (startDate < endDate) {
    let transaction = {
      date: new Date(startDate),
      amount: randomAmount(),
    };
    tempArrayData.push(transaction);

    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 7) + 1);
  }
  return tempArrayData;
};

export const getCustomers = async (startDate, endDate) => {
  const mappedData = [];
  const customers = await fetchCustomers();
  if (customers) {
    customers.forEach((customer) => {
      let newDate = new Date(startDate);
      mappedData.push({
        ...customer,
        transactions: generateRandomPurchaseDate(newDate, endDate),
      });
    });
  }
  return mappedData;
};
