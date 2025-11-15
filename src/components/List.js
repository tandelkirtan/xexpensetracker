import React from "react";
import styles from "./List.module.css";
import { ListCard } from "./ListCard";
import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export const List = () => {
  const { list } = useContext(ExpenseContext);
  // console.log(list);
  // console.log(list[0]);
  // console.log(list);

  return (
    <div className={styles.list_div}>
      <h1>Recent Transactions</h1>
      <div className={styles.maped_list}>
        {list.map((item) => (
          <ListCard
            // key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            category={item.category}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
};
