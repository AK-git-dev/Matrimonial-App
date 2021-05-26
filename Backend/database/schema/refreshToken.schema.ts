import { db } from "../index";
import { DataTypes } from "sequelize";

const RefreshToken = db.schema.define(
  "RefreshTokens",
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "RefreshTokens",
    freezeTableName: true,
  }
);

export default RefreshToken;
