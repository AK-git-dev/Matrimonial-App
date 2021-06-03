import { DataTypes } from "sequelize";
import { db } from "..";

const Languages = db.schema.define(
  "Languages",
  {
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "Languages",
    hooks: {
      beforeValidate: function (payload, options) {
        (payload as any).name = ((payload as any).name as string).toLowerCase();
      },
    },
  }
);

export default Languages;
