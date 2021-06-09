import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";

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
