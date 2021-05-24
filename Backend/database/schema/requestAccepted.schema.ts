import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";
import RequestSend from "./requestSend.schema";

const uuid = v4;

const RequestAccepted = db.schema.define(
  "RequestAccepted",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    friendID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "RequestAccepted",
    hooks: {
      beforeValidate: function (payload: any, options) {
        payload.id = uuid();
      },
      beforeCreate: function (payload: any, options) {
        const sendPersonId = payload.friendID;
        RequestSend.destroy({ where: { sendPersonId } })
          .then((r) =>
            console.log(`${sendPersonId} has accepted your connection request!`)
          )
          .catch((e) => console.error(e));
        payload.id = uuid();
      },
    },
  }
);

export default RequestAccepted;
