import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";

const Hobby = db.schema.define(
  "Hobbies",
  {
    name: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "Hobbies",
    hooks: {
      beforeValidate: function (payload, options) {
        (payload as any).name = ((payload as any).name as string).toLowerCase();
      },
    },
  }
);

export default Hobby;
