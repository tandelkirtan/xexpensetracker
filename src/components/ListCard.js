import React, { useState, useContext } from "react";
import styles from "./ListCard.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { LuPlane } from "react-icons/lu";
import { BiJoystick } from "react-icons/bi";
import { ExpenseContext } from "../context/ExpenseContext";



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

export const ListCard = ({ id, title, price, category, date }) => {
  

  const { list, setList, balance, setBalance } = useContext(ExpenseContext);

  // edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const openEdit = () => {
    setEditTitle(title);
    setEditPrice(price);
    setEditCategory(category);
    setEditDate(date);
    setEditOpen(true);
  };
  const closeEdit = () => setEditOpen(false);

  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDate, setEditDate] = useState("");

  const handleDelete = () => {
    const newList = list.filter((item) => item.id !== id);
    // refund the deleted expense amount back to balance
    const newBalance = Number(balance) + Number(price);
    setList(newList);
    setBalance(newBalance);
    localStorage.setItem("list", JSON.stringify(newList));
    localStorage.setItem("balance", newBalance);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedItem = {
      id,
      title: editTitle,
      price: editPrice,
      category: editCategory,
      date: editDate,
    };
    const newList = list.map((item) => (item.id === id ? updatedItem : item));
    // adjust balance: if price changed, calculate difference (old - new)
    const priceDiff = Number(price) - Number(editPrice);
    const newBalance = Number(balance) + priceDiff;
    setList(newList);
    setBalance(newBalance);
    localStorage.setItem("list", JSON.stringify(newList));
    localStorage.setItem("balance", newBalance);
    closeEdit();
  };

  const catIcon = (cat) => {
    if (cat === "Food") return <IoFastFoodOutline fontSize="25px" />;
    if (cat === "Travel") return <LuPlane fontSize="25px" />;
    if (cat === "Entertainment") return <BiJoystick fontSize="25px" />;
    return null;
  };
  

  return (
    <>
      <div className={styles.list_card}>
        <div className={styles.card_left_div}>
          <p className={styles.category_icon}>{catIcon(category)}</p>
          <div className={styles.item_date_div}>
            <p className={styles.item_name}>{title}</p>
            <p className={styles.date}>{date}</p>
          </div>
        </div>
        <div className={styles.card_right_div}>
          <p className={styles.card_price}>₹{price}</p>
          <div>
            <Button
              style={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "orange",
                margin: "0px 10px",
              }}
              onClick={openEdit}
            >
              <MdOutlineModeEditOutline fontSize="25px" />
            </Button>
            <Modal
              open={editOpen}
              onClose={closeEdit}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit Expense
                </Typography>
                <form onSubmit={handleEditSubmit}>
                  <input
                    required
                    placeholder="Title"
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    required
                    placeholder="Price"
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                  />
                  <select
                    required
                    className={styles.select}
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                  <input
                    required
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                  />
                  <button type="submit" className={styles.addExpense}>
                    Save
                  </button>
                  <button
                    type="button"
                    className={styles.cancle}
                    onClick={closeEdit}
                  >
                    Cancel
                  </button>
                </form>
              </Box>
            </Modal>
          </div>
          <div>
            <Button
              style={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "red",
                margin: "0px 10px",
              }}
              onClick={handleDelete}
            >
              <MdOutlineCancel fontSize="25px" />
            </Button>
          </div>
        </div>
      </div>
        <hr></hr>
    </>
  );
};
