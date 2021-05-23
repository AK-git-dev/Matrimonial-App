import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";

const uuid = v4;

const Caste = db.schema.define(
  "Castes",
  {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    caste: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    subCaste: {
      type: DataTypes.STRING(30),
    },
  },
  {
    freezeTableName: true,
    tableName: "Castes",
    indexes: [{ fields: ["caste"] }, { fields: ["subCaste"] }],
    hooks: {
      beforeValidate: function (caste, options) {
        (caste as any).id = uuid();
      },
    },
  }
);

export default Caste;
