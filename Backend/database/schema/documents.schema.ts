import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";

const uuid = v4;

const UploadedDocument = db.schema.define(
  "UploadedDocuments",
  {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    aadharCard: {
      type: DataTypes.TEXT,
    },
    drivingLicense: {
      type: DataTypes.TEXT,
    },
    passport: {
      type: DataTypes.TEXT,
    },
    voterCard: {
      type: DataTypes.TEXT,
    },
    panCard: {
      type: DataTypes.TEXT,
    },
    graduateCertificate: {
      type: DataTypes.TEXT,
    },
    higherSecondaryCertificate: {
      type: DataTypes.TEXT,
    },

    secondaryCertificate: {
      type: DataTypes.TEXT,
    },
    diplomaCertificate: {
      type: DataTypes.TEXT,
    },
    appointmentLetter: {
      type: DataTypes.TEXT,
    },
    tradeLicense: {
      type: DataTypes.TEXT,
    },
    taxation: {
      type: DataTypes.TEXT,
    },

    shopAggrement: {
      type: DataTypes.TEXT,
    },
    bankPassbook: {
      type: DataTypes.TEXT,
    },
    salarySlip: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
    tableName: "UploadedDocuments",
    hooks: {
      beforeValidate: function (UploadedDocument, options) {
        (UploadedDocument as any).id = uuid();
      },
    },
  }
);

export default UploadedDocument;
