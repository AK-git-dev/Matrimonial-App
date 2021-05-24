import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";

const uuid = v4;

const Message = db.schema.define(
  "Messages",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    sentMessagesContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    receivedMessagesContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sendTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("SEEN", "DELIVERED"),
    },
  },
  {
    freezeTableName: true,
    tableName: "Messages",
    hooks: {
      beforeValidate: function (payload, opts) {
        (payload as any).id = uuid();
      },
    },
  }
);

export default  Message;
