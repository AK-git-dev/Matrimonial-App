import { DataTypes } from "sequelize";
import { db } from "..";

const Song = db.schema.define(
  "Songs",
  {
    name: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "Songs",
    hooks: {
      beforeValidate: function(payload: any, options) {
        payload.name = payload.name.toLowerCase();
      }
    }
  }
);

export default Song;
