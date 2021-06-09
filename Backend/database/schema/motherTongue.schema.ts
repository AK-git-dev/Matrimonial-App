import { db } from "../index";
import { DataTypes } from "sequelize";
import User from "./user.schema";
import Languages from "./languages.schema";

const MotherTongue = db.schema.define(
  "MotherTongues",
  {
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      primaryKey: true,
    },
    LanguageName: {
      type: DataTypes.STRING(80),
      allowNull: false,
      references: {
        model: Languages,
        key: "name",
      },
    },
  },
  {
    freezeTableName: true,
    tableName: "MotherTongues",
  }
);

export default MotherTongue;
