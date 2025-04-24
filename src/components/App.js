import styles from "../styles/App.module.css";
import { useState, useRef } from "react";
import PopUp from "./PopUp";
import SideBar from "./SideBar";
import waldo from "../assets/waldoBackground.jpg";

function normPos(width, pos) {
  const refWidth = 3000; // This constant depends on the picture's original size
  const ratio = refWidth / width;
  const newPos = pos.map((x) => x * ratio);
  return newPos;
}

function App() {
  const [clickedPosition, setClickedPosition] = useState(false);
  const [popUpPosition, setPopUpPosition] = useState([0, 0]);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [waldoFound, setWaldoFound] = useState(false);
  const [wizardFound, setWizardFound] = useState(false);
  const [odlawFound, setOdlawFound] = useState(false);
  const imgRef = useRef(null);

  function handleClick(e) {
    if (popUpVisible) {
      setPopUpVisible(false);
      return;
    }
    setPopUpVisible(true);
    const imgProps = imgRef.current.getBoundingClientRect();
    const pos = normPos(imgProps.width, [
      e.pageX - imgProps.left,
      // getBoundingClientRect relative to viewport => need to offset scroll
      e.pageY - (imgProps.top + window.scrollY),
    ]);
    setClickedPosition(pos);
    setPopUpPosition([e.clientX, e.clientY]);
  }

  return (
    <div className={styles.main}>
      <SideBar waldo={waldoFound} wizard={wizardFound} odlaw={odlawFound} />
      <div className={styles.waldoBackground}>
        <img
          className={styles.waldoImg}
          onClick={handleClick}
          src={waldo}
          ref={imgRef}
        ></img>
      </div>
      {popUpVisible && (
        <PopUp
          clickedPos={clickedPosition}
          popUpPos={popUpPosition}
          setWaldo={setWaldoFound}
          setWizard={setWizardFound}
          setOdlaw={setOdlawFound}
          waldo={waldoFound}
          wizard={wizardFound}
          odlaw={odlawFound}
        />
      )}
    </div>
  );
}

export default App;
