import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../styles/Filters.module.css";
import {
  orderByTitle,
  orderByScore,
  filterByDiet,
  getDiets,
} from "../Actions/Actions";

export default function Filters({ setCurrentPage }) {
  const dispatch = useDispatch();
  const filterDiets = useSelector((state) => state.diets);

  function handleClickSOrder(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value), setCurrentPage(1));
  }

  function handleClickTOrder(e) {
    e.preventDefault();
    dispatch(orderByTitle(e.target.value), setCurrentPage(1));
  }
  function handleClickByDiet(e) {
    e.preventDefault();
    dispatch(filterByDiet(e.target.value), setCurrentPage(1));
  }

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);
  return (
    <div className={style.divStyle}>
      <select className={style.filters} onChange={(e) => handleClickSOrder(e)}>
        <option value="asc">Higer Score </option>
        <option value="desc">Lower Score</option>
      </select>
      <select
        className={style.filters}
        name="diet"
        onChange={(e) => handleClickByDiet(e)}
      >
        <option className={style.text} value="All">
          All Diets
        </option>
        {filterDiets.map((e) => (
          <option className={style.text} value={e.name} key={e.name}>
            {e.name}
          </option>
        ))}
      </select>
      <select
        className={style.filters}
        onChange={(e) => {
          handleClickTOrder(e);
        }}
      >
        <option value="All"> Alphabetic</option>
        <option value="az"> A-Z</option>
        <option value="za"> Z-A</option>
      </select>
    </div>
  );
}
