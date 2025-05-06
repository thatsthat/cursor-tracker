import styles from "../styles/BestScores.module.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

import apiCall from "../utils/apiFunctions";

function BestScores() {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  const getScores = async () => {
    const scores = await apiCall("get", "/");
    setScores(scores);
  };

  useEffect(() => {
    getScores();
  }, []);

  return (
    <div className={styles.main}>
      <Link to="/" className={styles.button}>
        Play Again
      </Link>
      <div className={styles.header}>Best Scores:</div>
      <div className={styles.scoresTable}>
        <p>
          <strong>Name:</strong>
        </p>
        <p>
          <strong>Time:</strong>
        </p>
        {scores &&
          scores.map((score, i) => (
            <>
              <p>{score.name}</p>
              <p>{score.time} seconds</p>
            </>
          ))}
      </div>
    </div>
  );
}

export default BestScores;
