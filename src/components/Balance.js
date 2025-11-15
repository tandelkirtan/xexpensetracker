import styles from "./Balance.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useEffect } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { useContext } from "react";

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

export const Balance = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addedAmount, setAddedAmount] = useState(0);
  const { balance, setBalance } = useContext(ExpenseContext);

  useEffect(() => {
    const localBalance = localStorage.getItem("balance");
    
    if(localBalance){
      setBalance(Number(localBalance))
    }
    else{
      setBalance(5000)
      localStorage.setItem("balance", 5000);
    }
  }, [setBalance])


    const handleSublit = (e) =>
      {
        e.preventDefault();
        const total = Number(balance) + Number(addedAmount)
        setBalance(total)
        localStorage.setItem("balance", total)
        handleClose();
  }
  
  return (
    <div className={styles.balance_div}>
      <h1>Wallet Balance: ₹{balance}</h1>
      <div>
        <Button
        style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "green",
            }}
            type="button"
        onClick={handleOpen}>+ Add Income</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Balance
            </Typography>
            <form onSubmit={handleSublit}>
              <input placeholder="Income Amount" required type="number" onChange={(e) => setAddedAmount(e.target.value)}></input>
              <button type="submit" className={styles.addbalance}>Add Balance</button>
              <button type="button" className={styles.cancel} onClick={handleClose}>Cancel</button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
