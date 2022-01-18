import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { recipeByID } from "../Actions/Actions";
import style from "../styles/Cards.module.css";
export default function Cards(e) {
  const dispatch = useDispatch();
  // console.log(e);

  return (
    <div className={style.cards}>
      <Link
        className={style.Link}
        onClick={() => dispatch(recipeByID(e.id))}
        to={"/Recipe/" + e.id}
      >
        <img className={style.image} src={e.image} alt="Not Found" />
        <p className={style.part}>Recipe Title: {e.title}</p>
        {e.diets.length > 0 ? (
          <p className={style.part}> Diets : {e.diets}</p>
        ) : (
          <p>This recipe its not part of any Diet</p>
        )}
        <p className={style.part}>Score : {e.score}</p>
      </Link>
    </div>
  );
}
