import styles from "../styles/FinishScreen.module.css";
import { useState, useRef, useEffect } from "react";
import apiCall from "../utils/apiFunctions";
import { Link, useNavigate } from "react-router";

const scoreData = [
  { name: "Player 1", time: 10 },
  { name: "Player 2", time: 12 },
  { name: "Player 3", time: 14 },
  { name: "Player 4", time: 22 },
  { name: "Player 5", time: 35 },
  { name: "Player 6", time: 394 },
  { name: "Player 7", time: 1204 },
  { name: "Player 8", time: 33 },
];

function FinishScreen({ time, intervId }) {
  const navigate = useNavigate();
  const upload = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(time);
    console.log(formData.get("name"));
    const resp = await apiCall(
      "post",
      "/",
      JSON.stringify({
        name: formData.get("name"),
        time: time,
      })
    );
    navigate("/best", { replace: true });
  };
  clearInterval(intervId);
  return (
    <div className={styles.overlay}>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.title}>Game finished in {time} seconds!</div>
        </div>
        <div className={styles.body}>
          <form id="fileForm" onSubmit={upload} encType="multipart/form-data">
            <div>Name:</div>
            <input type="text" id="name" name="name" />
            <button type="submit" className={styles.button}>
              Submit Score
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FinishScreen;
