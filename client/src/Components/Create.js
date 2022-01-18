import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createNewRecipe, getDiets } from "../Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import style from "../styles/Create.module.css";

function validate(input) {
  let errors = {};
  if (!input.title || !input.score) {
    errors.general = "All inputs with * cannot be empty";
  } else if (!typeof input.score === "number") {
    errors.score = "The recipe must have a number score";
  }
  return errors;
}

export default function Create() {
  const dispatch = useDispatch();
  const allDiets = useSelector((state) => state.diets);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    title: "",
    resume: "",
    score: 0,
    healthscore: 0,
    recipeOrder: "",
    image: "",
    diets: [],
  });
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.value]: e.target.value,
      })
    );
  }
  function handleDelete(d) {
    setInput({
      ...input,
      diets: input.diets.filter((diet) => diet !== d),
    });
  }

  const [diets, setDiets] = useState(false);
  const handleSelectedDiets = (e) => {
    setDiets(!diets);

    if (input.diets.includes(e.target.value)) {
      let pos = input.diets.indexOf(e.target.value);
      input.diets.splice(pos, 1);
    } else {
      input.diets.push(e.target.value);

      console.log(input.diets);
    }
  };
  function handleSubmit(e) {
    e.preventDefault();

    if (!input.title) {
      //   alert("Title cannot be empty");
    } else if (!input.score) {
      //   alert("Score cannot be empty");
    } else if (!typeof input.score === "number") {
      //   alert("The recipe must have a number score");
    } else {
      dispatch(createNewRecipe(input));
      alert("Receta Creada uwu");
      setInput({
        title: "",
        resume: "",
        score: "",
        healthscore: "",
        recipeOrder: "",
        image: "",
        diets: [],
      });
      navigate("/home");
    }
    // let result= validate(input)
    // if (result.length === 0) {
    // }
  }
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={style.backgroundDetails}>
      <Link to="/home">
        <button className={style.btnForm1}>Home</button>
      </Link>{" "}
      {errors.general && <p className={style.alerts}>{errors.general}</p>}
      <div className={style.alerts}>
        {errors.score && <p>{errors.score}</p>}
      </div>
      {/* <h1 className={style.title}>Make Your Own Recipe!!</h1> */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <ul>
          <div className={style.form}>
            <div>
              <label className={style.title}>Title* : </label>
              <input
                className={style.titleinput}
                type="text"
                value={input.title}
                name="title"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className={style.title}>Score* : </label>
              <input
                type="number"
                value={input.score}
                min="0"
                max="100"
                name="score"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className={style.title}> Health Score : </label>
              <input
                type="number"
                value={input.healthscore}
                name="healthscore"
                min="0"
                max="100"
                onChange={(e) => handleChange(e)}
              />
            </div>{" "}
            <label className={style.title}>Image : </label>
            <input
              type="url"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
            <div>
              <label className={style.resumeinst}>Resume : </label>
              <textarea
                className={style.text}
                type="text"
                value={input.resume}
                name="resume"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className={style.resumeinst}>Instruction : </label>
              <textarea
                className={style.text}
                type="text"
                value={input.recipeOrder}
                name="recipeOrder"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </ul>
        <div className={style.dietszone}>
          <label className={style.diettitle}>Diets :</label>
          {/* eslint-disable-next-line */}
          <select
            className={style.inputdiet}
            name="diets"
            value={input.diets}
            onChange={(e) => handleSelectedDiets(e)}
          >
            {allDiets.map((e) => (
              /* eslint-disable-next-line */
              <option className={style.dietoption} value={e.name} key={e.name}>
                {e.name}
              </option>
            ))}
          </select>
          {input.diets.map((d) => (
            <div className={style.diets}>
              <p className={style.dietoption}>{d.toUpperCase()}</p>
              {/* <button onClick={() => handleDelete(d)}>
                  Delete this option
                </button> */}
            </div>
          ))}
        </div>
        <button className={style.btnForm2} type="submit">
          Post Your Recipe
        </button>
      </form>
    </div>
  );
}
