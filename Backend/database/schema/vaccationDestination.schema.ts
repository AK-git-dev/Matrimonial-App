import { DataTypes } from "sequelize";
import { db } from "..";

const VaccationDestination = db.schema.define(
  "VaccationDestinations",
  {
    name: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "VaccationDestinations",
    hooks: {
      beforeValidate: function (payload: any, options) {
        payload.name = (payload.name as string).toLowerCase();
      },
    },
  }
);

export default VaccationDestination;
