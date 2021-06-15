import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";
import RequestReceived from "./requestRecived.schema";

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
        const UserId = payload.UserId;
        const sendPersonId = payload.sendPersonId;

        RequestReceived.findOrCreate({
          where: { senderId: UserId, UserId: sendPersonId },
        }).then((m) => {
          console.log(
            `${sendPersonId} has received connection request from ${UserId}`
          );
        });
      },
    },
  }
);

export default RequestSend;
