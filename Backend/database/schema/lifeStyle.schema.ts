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
      type: DataTypes.DECIMAL,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    bloogGroup: {
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
    drikingHabbits: {
      type: DataTypes.STRING,
    },
    smokingHabbits: {
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
      type: DataTypes.STRING(80),
    },
    haveAnyDieases: {
      type: DataTypes.BOOLEAN,
    },
    descriptionOfDieases: {
      type: DataTypes.STRING(80),
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
