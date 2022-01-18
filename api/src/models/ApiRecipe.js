const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "apiRecipe",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      score: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
