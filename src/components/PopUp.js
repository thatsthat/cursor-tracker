import styles from "../styles/PopUp.module.css";

function PopUp({ pos }) {
  const posi = "X: " + pos[0] + " - Y: " + pos[1];
  console.log(posi);
  return (
    <>
      <div
        className={styles.main}
        style={{ top: `${pos[1]}px`, left: `${pos[0]}px` }}
      >
        {posi}
      </div>
    </>
  );
}

export default PopUp;
