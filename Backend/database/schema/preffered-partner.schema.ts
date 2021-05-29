import { db } from "../index";
import { DataTypes } from "sequelize";
import { v4 } from "uuid";

const uuid = v4;

const PrefferedPartnerChoice = db.schema.define(
  "PrefferedPartnerChoices",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },

    minHeight: {
      type: DataTypes.STRING(3),
    },
    maxHeight: {
      type: DataTypes.STRING(3),
    },

    minAge: {
      type: DataTypes.STRING(2),
    },

    maxAge: {
      type: DataTypes.STRING(2),
    },

    expectedSalary: {
      type: DataTypes.STRING(10),
    },
    salaryType: {
      type: DataTypes.ENUM("INR", "DOLLAR"),
    },
  },
  {
    freezeTableName: true,
    tableName: "PrefferedPartnerChoices",
    hooks: {
      beforeValidate(payload, options) {
        (payload as any).id = uuid();
      },
    },
  }
);

export default PrefferedPartnerChoice;
