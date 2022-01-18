import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { allRecipes } from "../Actions/Actions";
import { useSelector } from "react-redux";
import Cards from "./Cards";
import Filters from "./Filters";
import NavBar from "./NavBar";
import Pagination from "./Pagination";
import style from "../styles/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const { filteredRecipes } = useSelector((state) => state);

  var [currentPage, setCurrentPage] = useState(1);
  const [showRecipes] = useState(9);
  const indexLastC = currentPage * showRecipes;
  const indexFirstC = indexLastC - showRecipes;
  const actualRecipes = filteredRecipes.slice(indexFirstC, indexLastC);
  const actualPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(allRecipes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(allRecipes(), setCurrentPage(1));
  }
  return (
    <div className={style.background}>
      <div className={style.generalBar}>
        <div className={style.margin}>
          <div className={style.bar}>
            <button
              className={style.button}
              onClick={(e) => {
                handleClick(e);
              }}
            >
              All Recipes
            </button>
            <Link to="/NewRecipe">
              <button className={style.button}>Create a Recipe</button>
            </Link>
          </div>
          <NavBar />
          <Filters setCurrentPage={setCurrentPage} />
          <Pagination
            showRecipes={showRecipes}
            filteredRecipes={filteredRecipes.length}
            actualPage={actualPage}
          />
          {actualRecipes?.map((e) => {
            let diet = [];
            for (let i = 0; i < e.diets.length; i++) {
              diet.push(e.diets[i].name);
            }
            return (
              <Cards
                key={e.id}
                image={e.image}
                id={e.id}
                title={e.title}
                diets={diet?.join(" - ")}
                score={e.score}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
