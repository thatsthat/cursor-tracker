import styles from "../styles/GameScreen.module.css";
import { useState, useRef, useEffect } from "react";
import PopUp from "./PopUp";
import SideBar from "./SideBar";
import FinishScreen from "./FinishScreen";
import waldo from "../assets/waldoBackground.jpg";

function normPos(width, pos) {
  const refWidth = 3000; // This constant depends on the picture's original size
  const ratio = refWidth / width;
  const newPos = pos.map((x) => x * ratio);
  return newPos;
}

function GameScreen() {
  const [clickedPosition, setClickedPosition] = useState(false);
  const [popUpPosition, setPopUpPosition] = useState([0, 0]);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [waldoFound, setWaldoFound] = useState(false);
  const [wizardFound, setWizardFound] = useState(false);
  const [odlawFound, setOdlawFound] = useState(false);
  const [count, setCount] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [intervalId, setIntervalId] = useState(0);
  const imgRef = useRef(null);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    });

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      let id = setInterval(tick, delay);
      setIntervalId(id);
      return () => clearInterval(id);
    }, [delay]);
  }

  useEffect(() => {
    setGameFinished(waldoFound && odlawFound && wizardFound);
  }, [waldoFound, odlawFound, wizardFound]);

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

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  return (
    <div className={styles.main}>
      <SideBar
        waldo={waldoFound}
        wizard={wizardFound}
        odlaw={odlawFound}
        counter={count}
      />
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
          popUpVisible={setPopUpVisible}
          popUpPos={popUpPosition}
          setWaldo={setWaldoFound}
          setWizard={setWizardFound}
          setOdlaw={setOdlawFound}
          waldo={waldoFound}
          wizard={wizardFound}
          odlaw={odlawFound}
        />
      )}
      {gameFinished && <FinishScreen time={count} intervId={intervalId} />}
    </div>
  );
}

export default GameScreen;
