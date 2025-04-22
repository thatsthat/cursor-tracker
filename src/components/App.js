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

function itIsWaldo(pos) {
  const waldoPos = [1850, 750];
  if (
    Math.abs(pos[0] - waldoPos[0]) < 40 &&
    Math.abs(pos[1] - waldoPos[1]) < 40
  )
    return true;
  else return false;
}

function App() {
  const [foundWaldo, setFoundWaldo] = useState(false);
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
    setFoundWaldo(itIsWaldo(pos));
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
      {popUpVisible && (
        <PopUp waldoFound={foundWaldo} cursPos={cursorPosition} />
      )}
    </>
  );
}

export default App;
