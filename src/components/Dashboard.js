import { Balance } from "./Balance"
import styles from "./Transaction.module.css"

import "./Das.css"
import { Expense } from "./Expense"
import PieChartWithCustomizedLabel, { PieChart } from "./PieChart"

export const Dashboard = () => {
  return (
    <div className={styles.dash_div}>
        <h1>Expense Tracker</h1>
        <div className={styles.wal_exp_chart_div}>
              <Balance/>
              <Expense/>
              <PieChartWithCustomizedLabel/>
        </div>
    </div>
  )
}