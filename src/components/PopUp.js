import styles from "../styles/PopUp.module.css";
import { useRef, useLayoutEffect, useState } from "react";

function PopUp({
  clickedPos,
  popUpPos,
  setWaldo,
  setWizard,
  setOdlaw,
  waldo,
  wizard,
  odlaw,
}) {
  const myRef = useRef(null);
  const [finalPos, setFinalPos] = useState([0, 0]);

  function youFoundIt(p, name) {
    const waldoPos = [1850, 750];
    const wizardPos = [812, 700];
    const odlawPos = [320, 705];
    var charPos = [];
    switch (name) {
      case "Waldo":
        charPos = waldoPos;
        break;
      case "Wizard":
        charPos = wizardPos;
        break;
      case "Odlaw":
        charPos = odlawPos;
        break;
      default:
        console.log("Something is wrong");
    }

    if (Math.abs(p[0] - charPos[0]) < 40 && Math.abs(p[1] - charPos[1]) < 40)
      return true;
    else return false;
  }

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

  function handleClick(e) {
    const charFound = youFoundIt(clickedPos, e.target.id);
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
