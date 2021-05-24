import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";

const uuid = v4;

const PrivacySetting = db.schema.define(
  "PrivacySettings",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(
        "VISIBLE_TO_ALL",
        "ONLY_CONNECTIONS_ACCEPTED",
        "PRIVATE"
      ),
      defaultValue: "ONLY_CONNECTIONS_ACCEPTED",
    },
  },
  {
    freezeTableName: true,
    tableName: "PrivacySettings",
    hooks: {
      beforeValidate: function (payload: any, opts) {
        payload.id = uuid();
      },
    },
  }
);

export default  PrivacySetting;
