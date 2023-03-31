const { DataTypes, UUIDV4 } = require("sequelize");

//Creo la funcion que define el modelo
const Diet = (sequelize) => {
  sequelize.define(
    "Diet",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timetamps: false }
  );
};

//Exporto la funcion
module.exports = Diet;
