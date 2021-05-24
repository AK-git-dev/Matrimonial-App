import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";

const uuid = v4;

const ProfilPicture = db.schema.define(
  "ProfilePictures",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "ProfilePictures",
    hooks: {
      beforeValidate: function (payload: any, options) {
        payload.id = uuid();
      },
    },
  }
);

export default ProfilPicture;
