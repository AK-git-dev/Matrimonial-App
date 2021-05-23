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
      type: DataTypes.STRING(15),
    },
    currentCompanyName: {
      type: DataTypes.STRING(15),
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
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
