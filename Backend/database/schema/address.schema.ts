import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";

const uuid = v4;

const Address = db.schema.define(
  "Addresses",
  {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    address: { type: DataTypes.STRING(30), allowNull: false },
    city: { type: DataTypes.STRING(30), allowNull: false },
    district: { type: DataTypes.STRING(30), allowNull: false },
    country: { type: DataTypes.STRING(30), allowNull: false },
    zipCode: { type: DataTypes.STRING(30), allowNull: false },
  },
  {
    freezeTableName: true,
    tableName: "Addresses",
    hooks: {
      beforeValidate: function (address, options) {
        (address as any).id = uuid();
      },
    },
  }
);

export default Address;
