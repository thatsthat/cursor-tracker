import styles from "../styles/App.module.css";
import { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import GameScreen from "./GameScreen";

function App() {
  return (
    <div className={styles.main}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GameScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
