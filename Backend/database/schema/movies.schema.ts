import { DataTypes } from "sequelize";
import { db } from "..";

const Movie = db.schema.define(
  "Movies",
  {
    name: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "Movies",
    hooks: {
      beforeValidate: function (payload: any, options) {
        payload.name = (payload.name as string).toLowerCase();
      },
    },
  }
);

export default Movie;
