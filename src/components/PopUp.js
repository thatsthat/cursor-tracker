import styles from "../styles/PopUp.module.css";
import { useRef, useEffect, useState } from "react";

function PopUp({ pos, cursPos }) {
  const myRef = useRef(null);
  const posi = "X: " + pos[0] + " - Y: " + pos[1];
  const [finalPos, setFinalPos] = useState([0, 0]);

  useEffect(() => {
    const imgData = myRef.current.getBoundingClientRect();
    const fpx = Math.min(cursPos[0], window.innerWidth - imgData.width);
    const fpy = Math.min(cursPos[1], window.innerHeight - imgData.height);
    setFinalPos([fpx, fpy]);
    console.log(finalPos);
  }, [cursPos]);

  return (
    <div
      ref={myRef}
      className={styles.main}
      style={{ top: `${finalPos[1]}px`, left: `${finalPos[0]}px` }}
    >
      {posi}
    </div>
  );
}

export default PopUp;
