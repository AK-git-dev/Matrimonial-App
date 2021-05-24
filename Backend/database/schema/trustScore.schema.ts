import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";
import RequestAccepted from "./requestAccepted.schema";
import User from "./user.schema";

const uuid = v4;

const TrustScore = db.schema.define(
  "TrustScores",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    matchingID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: RequestAccepted, key: "id" },
    },
    firstUser: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    secondUser: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "id" },
    },
  },
  {
    freezeTableName: true,
    tableName: "TrustScores",
    hooks: {
      beforeValidate: function (payload: any, options) {
        payload.id = uuid();
      },
    },
  }
);

export default TrustScore;
