import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { Transaction } from "./components/Transaction";
import { ExpenseProvider } from "./context/ExpenseContext";

function App() {
  return (
    <ExpenseProvider>
      <div className="app_div">
        <Dashboard />
        <Transaction />
      </div>
    </ExpenseProvider>
  );
}

export default App;
