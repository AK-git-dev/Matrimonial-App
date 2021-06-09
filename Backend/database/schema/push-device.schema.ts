import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";
import User from "./user.schema";

const PushDevice = db.schema.define(
  "PushDevices",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platform: {
      type: DataTypes.ENUM("android", "ios"),
    },
    UserId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    tableName: "PushDevices",
    hooks: {
      beforeValidate: function (payload: any, options) {
        payload.id = v4();
      },
    },
  }
);

export default PushDevice;
