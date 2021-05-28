import { DataTypes } from "sequelize";
import { db } from "..";

const BlockedUsers = db.schema.define(
  "BlockedUsers",
  {
    blockedPersonId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "BlockedUsers",
  }
);

export default BlockedUsers;
