import styles from "./Expense.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Expense = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { balance,setBalance, totalExpense, list, setList } =
    useContext(ExpenseContext);

  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState();
  const [isMounted, setIsMounted] = useState(false);

  const formData = {
    title: "",
    price: "",
    category: "",
    date: "",
    id: "",
  };

  useEffect(() => {
    const localList = JSON.parse(localStorage.getItem("list"));
    if (!localList) {
      localStorage.setItem("list", JSON.stringify([]));
      setList([]);
    } else {
      setList(localList);
    }
    setIsMounted(true);
  }, [setList]);

  useEffect(() => {
    if (isMounted && list.length >= 0) {
      localStorage.setItem("list", JSON.stringify(list));
    }
  }, [list, isMounted]);

  const handleSubmit = (e) => {
    if (price > balance) {
      alert("Insifficent Balance");
      handleClose();
      return;
    }
    e.preventDefault();
    formData.id = Date.now();
    formData.title = title;
    formData.price = price;
    formData.category = category;
    formData.date = date;
    console.log(formData);
    let newBal = balance - Number(price);
    setBalance(newBal)
    localStorage.setItem("balance", newBal);
    setList((prevList) => [...prevList, formData]);
    handleClose();
  };

  return (
    <div className={styles.expense_div}>
      <h1>Expense:- ₹{totalExpense}</h1>
      <div>
        <Button
          style={{
            color: "white",
            fontWeight: "bold",
            backgroundColor: "red",
          }}
          onClick={handleOpen}
        >
          + Add Expense
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Expense
            </Typography>
            <form onSubmit={handleSubmit}>
              <input
                required
                placeholder="Title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              <input
                required
                placeholder="Price"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
              ></input>
              <select
                required
                className={styles.select}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled selected>
                  Select Category
                </option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Entertainment">Entertainment</option>
              </select>
              <input
                required
                type="date"
                onChange={(e) => setDate(e.target.value)}
              ></input>
              <button type="submit" className={styles.addExpense}>
                Add Expense
              </button>
              <button
                type="button"
                className={styles.cancle}
                onClick={handleClose}
              >
                Cancel
              </button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
