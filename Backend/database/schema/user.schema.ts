import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";

const uuid = v4;

const User = db.schema.define(
  "Users",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    age: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Shemale"),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    martialStatus: {
      type: DataTypes.ENUM(
        "Single",
        "Widowed",
        "Marriaged",
        "Divorced",
        "Separated"
      ),
      allowNull: false,
    },
    motherTongue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCasteBarrier: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    fathersName: {
      type: DataTypes.STRING,
    },
    mothersName: {
      type: DataTypes.STRING,
    },
    accountActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
    tableName: "Users",
    indexes: [
      { fields: ["age"] },
      { fields: ["fullname"] },
      { fields: ["martialStatus"] },
    ],
    hooks: {
      beforeValidate: function (user: any, options) {
        user.id = uuid();
        const ageNow =
          new Date().getUTCFullYear() -
          new Date(user.dateOfBirth.getUTCFullYear).getUTCFullYear();
        user.age = ageNow;
      },
    },
  }
);

export default User;
