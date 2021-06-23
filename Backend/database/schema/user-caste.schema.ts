import { DataTypes } from "sequelize";
import { db } from "..";
import Caste from "./caste.schema";
import User from "./user.schema";

const UserCaste = db.schema.define(
  "UserCastes",
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
    CasteId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Caste,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    tableName: "UserCastes",
  }
);


export default UserCaste;