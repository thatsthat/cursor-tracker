import styles from "../styles/App.module.css";
import { useState } from "react";
import PopUp from "./PopUp";
import waldo from "../assets/waldoBackground.jpg";

function normPos(width, pos) {
  const refWidth = 3000;
  const ratio = refWidth / width;
  const newPos = pos.map((x) => x * ratio);
  return newPos;
}

function App() {
  const [position, setPosition] = useState([0, 0]);
  const [cursorPosition, setCursorPosition] = useState([0, 0]);
  const [popUpVisible, setPopUpVisible] = useState(false);

  function handleClick(e) {
    setPopUpVisible(true);
    const image = document.getElementById("waldo");
    const imgProps = image.getBoundingClientRect();
    const pos = normPos(imgProps.width, [
      e.pageX - imgProps.left,
      // getBoundingClientRect relative to viewport => need to offset scroll
      e.pageY - (imgProps.top + window.scrollY),
    ]);
    setPosition(pos.map((x) => Math.round(x)));
    setCursorPosition([e.clientX, e.clientY]);
  }

  return (
    <>
      <img
        id="waldo"
        className={styles.rootElem}
        onClick={handleClick}
        src={waldo}
      ></img>
      {popUpVisible && <PopUp pos={position} cursPos={cursorPosition} />}
    </>
  );
}

export default App;
