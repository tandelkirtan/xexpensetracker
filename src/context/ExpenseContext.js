import React, { createContext, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [balance, setBalance] = useState(5000);
  const [expense, setExpense] = useState(0);
  const [list, setList] = useState([]);

  const totalExpense = list.reduce((sum, item) => sum + Number(item.price), 0);

  const value = {
    balance,
    setBalance,
    expense,
    setExpense,
    list,
    setList,
    totalExpense
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};