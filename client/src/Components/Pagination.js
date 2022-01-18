import React from "react";
import style from "../styles/Pagination.module.css";
export default function Pagination({
  showRecipes,
  filteredRecipes,
  actualPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredRecipes / showRecipes); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className={style.pagination}>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <button className={style.paginationButton} key={number}>
                {/* eslint-disable-next-line */}
                <a
                  onClick={() => actualPage(number)}
                  className={style.espeshial}
                >
                  {number}
                </a>
              </button>
            );
          })}
      </ul>
    </nav>
  );
}
