const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100,
      },
      allowNull: true,
    },
    healthscore: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100,
      },
      allowNull: true,
    },
    recipeOrder: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
