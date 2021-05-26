import { db } from "../index";
import { DataTypes } from "sequelize";
import { uuid } from "../../server/utils";
import crypto from "crypto";
import { genSaltSync, hashSync } from "bcrypt";

const PreSignup = db.schema.define(
  "PreSignups",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING(13),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otpCode: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
  },
  {
    tableName: "PreSignups",
    freezeTableName: true,
    hooks: {
      beforeValidate(payload, options) {
        if (
          (payload as any).phoneNumber.length < 5 ||
          (payload as any).phoneNumber.length < 11
        ) {
          (payload as any).id = uuid();
          (payload as any).password = hashSync(
            (payload as any).password,
            genSaltSync(10)
          );
          (payload as any).otpCode = Math.ceil(
            100000 + Math.random() * 131313
          ).toString();
        }
      },
    },
  }
);

export default PreSignup;
