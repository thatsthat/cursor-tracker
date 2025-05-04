import styles from "../styles/FinishScreen.module.css";
import { useState, useRef } from "react";
import apiCall from "../utils/apiFunctions";

function FinishScreen({ time, intervId }) {
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
    console.log(resp);
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
