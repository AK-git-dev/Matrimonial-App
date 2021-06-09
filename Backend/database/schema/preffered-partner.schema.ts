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

    caste: {
      type: DataTypes.STRING(30),
    },
    occupation: {
      type: DataTypes.STRING(100),
    },
    country: {
      type: DataTypes.STRING(45),
    },
    martitialStatus: {
      type: DataTypes.ENUM(
        "Any",
        "Never",
        "Married",
        "Divorced",
        "Separated",
        "Widowed"
      ),
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
