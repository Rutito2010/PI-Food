import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recipeByID } from "../Actions/Actions";
import { Link } from "react-router-dom";
import style from "../styles/Card.module.css";

export default function Card(id) {
  const dispatch = useDispatch();
  // const loading = useSelector((state) => state.loading);
  const { oneRecipe } = useSelector((state) => state);
  // console.log(id);
  // const {
  //   match: { params },
  // } = props;

  // let id = params.id;

  useEffect(() => {
    // dispatch(loading());
    dispatch(recipeByID(id));
  }, [dispatch, id]);

  //return oneRecipe === undefined ? ( // deberiamos verificar q al menos tenga 1 propiedad
  if (!oneRecipe.hasOwnProperty("title")) {
    return <div> There is no Recipe</div>;
  } else {
    return (
      <div className={style.background}>
        <div>
          <Link to="/Home">
            <button className={style.btn}>Home</button>
          </Link>
        </div>
        <div>
          <div className={style.head}>
            <h1>Title : {oneRecipe.title}</h1>
            {/* eslint-disable-next-line */}
            <img
              className={style.image}
              src={oneRecipe.image}
              alt="This Recipe Does Not Contain Image "
            />
          </div>
          <div>
            <h2 className={style.h2}>
              Diets :
              {oneRecipe.diets.length > 0 ? (
                // eslint-disable-next-line
                typeof oneRecipe.id === "number" ? (
                  oneRecipe.diets.join(" - ")
                ) : (
                  oneRecipe.diets.map((d) => d.name + " - ")
                )
              ) : (
                <h4>This recipe its not part of any Diet</h4>
              )}
            </h2>
            <div className={style.data2}>
              <h2 className={style.h2}>Dish Type : {oneRecipe?.dishType}</h2>
              <h2 className={style.h2}>Score : {oneRecipe?.score}</h2>
              <h2 className={style.h2}>
                Healt Score : {oneRecipe?.healthscore}
              </h2>
            </div>
            <h3 className={style.h3}>Resume : {oneRecipe?.resume}</h3>
            <h3 className={style.h3}>Instructions : </h3>
            {oneRecipe.recipeOrder?.length &&
            typeof oneRecipe.id === "number" ? (
              oneRecipe.recipeOrder.map((e) =>
                e.map((i) => (
                  <h4 className={style.h4}>
                    Step {i[0]} : {i[1]}
                  </h4>
                ))
              )
            ) : oneRecipe.recipeOrder.length ? (
              <h4 className={style.h4}>{oneRecipe.recipeOrder} </h4>
            ) : (
              <h3 className={style.h3}>Not Intructions Found</h3>
            )}
          </div>
        </div>
      </div>
    );
  }
}
