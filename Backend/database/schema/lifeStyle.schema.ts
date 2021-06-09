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
      type: DataTypes.ENUM("Slim", "Athletic", "Average", "Fat"),
    },
    skinComplextion: {
      type: DataTypes.ENUM("Very fair", "Fair", "Whitish", "Dark"),
    },
    diet: {
      type: DataTypes.ENUM("Veg", "Egalitarian", "Non veg", "Jain", "Vegan"),
    },
    drinkingHabits: {
      type: DataTypes.ENUM("Non drinker", "Casual", "Regular"),
    },
    smokingHabits: {
      type: DataTypes.ENUM("Non smoker", "Casual", "Regular"),
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
    haveAnyDisability: {
      type: DataTypes.BOOLEAN,
    },
    descriptionOfDisability: {
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
        if (
          (payload as any).haveAnyDisability === true &&
          !(payload as any).descriptionOfDisability
        )
          throw Error("Please specify your disability description");
      },
    },
  }
);

export default LifeStyle;
