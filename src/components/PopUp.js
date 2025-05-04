import styles from "../styles/PopUp.module.css";
import { useRef, useLayoutEffect, useState } from "react";
import apiCall from "../utils/apiFunctions";

function PopUp({
  clickedPos,
  popUpPos,
  popUpVisible,
  setWaldo,
  setWizard,
  setOdlaw,
  waldo,
  wizard,
  odlaw,
}) {
  const myRef = useRef(null);
  const [finalPos, setFinalPos] = useState([0, 0]);

  function hideChar(name) {
    switch (name) {
      case "Waldo":
        setWaldo(true);
        break;
      case "Wizard":
        setWizard(true);
        break;
      case "Odlaw":
        setOdlaw(true);
        break;
      default:
        console.log("Something is wrong");
    }
  }

  useLayoutEffect(() => {
    const imgData = myRef.current.getBoundingClientRect();
    const fpx = Math.min(popUpPos[0], window.innerWidth - imgData.width);
    const fpy = Math.min(popUpPos[1], window.innerHeight - imgData.height);
    setFinalPos([fpx, fpy]);
  }, [popUpPos]);

  async function handleClick(e) {
    popUpVisible(false);
    // Call to backend to check if character found.
    const charFound = await apiCall(
      "get",
      "/" +
        e.target.id +
        "/" +
        Math.floor(clickedPos[0]) +
        "/" +
        Math.floor(clickedPos[1])
    );
    if (charFound) {
      console.log(e.target.id + " found!");
      hideChar(e.target.id);
    } else console.log("Keep trying");
  }

  return (
    <div
      ref={myRef}
      className={styles.main}
      style={{ top: `${finalPos[1]}px`, left: `${finalPos[0]}px` }}
    >
      {!waldo && (
        <div id="Waldo" className={styles.button} onClick={handleClick}>
          Waldo
        </div>
      )}
      {!wizard && (
        <div id="Wizard" className={styles.button} onClick={handleClick}>
          Wizard
        </div>
      )}

      {!odlaw && (
        <div id="Odlaw" className={styles.button} onClick={handleClick}>
          Odlaw
        </div>
      )}
    </div>
  );
}

export default PopUp;
