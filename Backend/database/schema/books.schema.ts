import { DataTypes } from "sequelize";
import { db } from "..";

const Books = db.schema.define(
  "Books",
  {
    name: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "Books",
  }
);

export default Books;
