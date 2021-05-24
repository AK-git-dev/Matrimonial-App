import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";

const uuid = v4 ;

const Education = db.schema.define(
  "Educations",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("Gradudate", "Postgraduate", "Doctorate"),
      allowNull: false,
    },
    degree: {
      type: DataTypes.ENUM("B.Tech", "M.Tech", "Masters", "Hons", "B.Par"),
      allowNull: false,
    },
    InstitutionName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    specializationIn: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    passoutYear: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "Educations",
    indexes: [{ fields: ["type", "degree"], using: "HASH" }],
    hooks: {
      beforeValidate: function (education, options) {
        (education as any).id = uuid();
      },
    },
  }
);


export default Education;