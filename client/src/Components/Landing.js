import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/Landing.module.css";

export default function Landing() {
  return (
    <div className={style.background}>
      <ul className={style.ul}>
        <h1>The Food App!</h1>
        <Link to="/Home">
          <button className={style.button}>Lets Find a Recipe!</button>
        </Link>
      </ul>
    </div>
  );
}
