import styles from "../styles/BestScores.module.css";
import { useState, useRef } from "react";
import apiCall from "../utils/apiFunctions";

const scores = [
  { name: "Player 1", time: 10 },
  { name: "Player 2", time: 11 },
  { name: "Player 3", time: 12 },
  { name: "Player 4", time: 13 },
  { name: "Player 5", time: 14 },
  { name: "Player 6", time: 15 },
  { name: "Player 6", time: 23 },
  { name: "Player 7", time: 44 },
];

function BestScores() {
  return <div className={styles.main}>hello world</div>;
}

export default BestScores;
