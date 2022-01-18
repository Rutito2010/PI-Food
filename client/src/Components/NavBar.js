import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { recipeByTitle } from "../Actions/Actions";
import style from "../styles/NavBar.module.css";
export default function NavBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(recipeByTitle(search));
    setSearch("");
  };

  const handleChange = async (e) => {
    await setSearch(e.target.value);
  };

  return (
    <div className={style.divStyle}>
      <input
        className={style.input}
        type="text"
        placeholder="Insert Recipe Title..."
        value={search}
        onChange={(e) => handleChange(e)}
      />
      <button
        className={style.button}
        type="submit"
        onClick={(e) => handleClick(e)}
      >
        Search
      </button>
    </div>
  );
}
