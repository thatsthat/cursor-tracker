import styles from "../styles/App.module.css";
import { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import GameScreen from "./GameScreen";
import BestScores from "./BestScores";

function App() {
  return (
    <div className={styles.main}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GameScreen />} />
          <Route path="/best" element={<BestScores />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
