import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";

const uuid = v4;

const Occupation = db.schema.define(
  "Occupations",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING(100),
    },
    position: {
      type: DataTypes.STRING(100),
    },
    currentCompanyName: {
      type: DataTypes.STRING(200),
    },
    salary: {
      type: DataTypes.STRING(10),
    },
    isSelfEmployeed: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
    tableName: "Occupations",
    hooks: {
      beforeValidate: function (paylod, options) {
        (paylod as any).id = uuid();
      },
    },
  }
);

export default Occupation;
