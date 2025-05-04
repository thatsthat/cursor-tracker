import styles from "../styles/SideBar.module.css";
import { useState, useRef } from "react";
import waldoIcon from "../assets/waldo.png";
import wizardIcon from "../assets/wizard.gif";
import odlawIcon from "../assets/odlaw.gif";

function SideBar({ waldo, wizard, odlaw, counter }) {
  return (
    <div className={styles.main}>
      <div className={waldo ? styles.found : undefined}>
        <img id="waldo" width="50" src={waldoIcon}></img>
        <p>Waldo</p>
      </div>
      <div className={wizard ? styles.found : undefined}>
        <img id="wizard" width="50" src={wizardIcon}></img>
        <p>Wizard</p>
      </div>
      <div className={odlaw ? styles.found : undefined}>
        <img id="odlaw" width="50" src={odlawIcon}></img>
        <p>Odlaw</p>
      </div>
      <div>
        <p>Counter: {counter}</p>
      </div>
    </div>
  );
}

export default SideBar;
