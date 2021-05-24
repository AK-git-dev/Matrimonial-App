import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";

const uuid = v4;

const RequestSend = db.schema.define(
  "RequestSend",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    sendPersonId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "RequestSend",
    hooks: {
      beforeValidate: function (payload: any, options) {
        payload.id = uuid();
      },
    },
  }
);

export default RequestSend;
