import styles from "../styles/App.module.css";
import { useState, useEffect } from "react";
import PopUp from "./PopUp";

function App() {
  const [position, setPosition] = useState([0, 0]);
  const [popUpVisible, setPopUpVisible] = useState(false);

  function handleClick(e) {
    setPopUpVisible(true);
    setPosition([e.clientX, e.clientY]);
  }

  return (
    <>
      <div className={styles.rootDiv} onClick={handleClick}></div>
      {popUpVisible && <PopUp pos={position} />}
    </>
  );
}

export default App;
