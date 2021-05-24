import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";

const uuid = v4;

const LifeStyle = db.schema.define(
  "LifeStyles",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    height: {
      type: DataTypes.STRING(3),
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    bloodGroup: {
      type: DataTypes.CHAR(3),
    },
    dressStyle: {
      type: DataTypes.STRING,
    },
    bodyShape: {
      type: DataTypes.STRING,
    },
    skinComplextion: {
      type: DataTypes.STRING,
    },
    diet: {
      type: DataTypes.STRING,
    },
    drinkingHabits: {
      type: DataTypes.STRING,
    },
    smokingHabits: {
      type: DataTypes.STRING,
    },
    sportsFitness: {
      type: DataTypes.STRING,
    },
    anyChildren: {
      type: DataTypes.ENUM("1", "2", "3+"),
    },
    dateOfMarriage: {
      type: DataTypes.DATEONLY,
    },
    dateDivorced: {
      type: DataTypes.DATEONLY,
    },
    isDivorced: {
      type: DataTypes.BOOLEAN,
    },
    reasonForDivorced: {
      type: DataTypes.STRING(180),
    },
    haveAnyDieases: {
      type: DataTypes.BOOLEAN,
    },
    descriptionOfDieseases: {
      type: DataTypes.STRING(180),
    },
  },
  {
    freezeTableName: true,
    tableName: "LifeStyles",
    indexes: [{ fields: ["height"] }, { fields: ["diet"] }],
    hooks: {
      beforeValidate: function (payload, options) {
        (payload as any).id = uuid();
      },
    },
  }
);

export default LifeStyle;
