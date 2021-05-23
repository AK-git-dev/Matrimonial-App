import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";

const uuid = v4;

const UploadedDocument = db.schema.define(
  "UploadedDocuments",
  {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    aadharCard: {
      type: DataTypes.STRING(70),
    },
    drivingLicense: {
      type: DataTypes.STRING(70),
    },
    passport: {
      type: DataTypes.STRING(70),
    },
    voterCard: {
      type: DataTypes.STRING(70),
    },
    panCard: {
      type: DataTypes.STRING(70),
    },
    graduateCertificate: {
      type: DataTypes.STRING(70),
    },
    higherSecondaryCertificate: {
      type: DataTypes.STRING(70),
    },

    secondaryCertificate: {
      type: DataTypes.STRING(70),
    },
    diplomaCertificate: {
      type: DataTypes.STRING(70),
    },
    appointmentLetter: {
      type: DataTypes.STRING(70),
    },
    tradeLicense: {
      type: DataTypes.STRING(70),
    },
    taxation: {
      type: DataTypes.STRING(70),
    },

    shopAggrement: {
      type: DataTypes.STRING(70),
    },
    bankPassbook: {
      type: DataTypes.STRING(70),
    },
    salarySlip: {
      type: DataTypes.STRING(70),
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