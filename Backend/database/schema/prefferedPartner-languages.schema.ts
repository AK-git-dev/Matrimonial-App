import { DataTypes } from "sequelize";
import { db } from "..";

const PrefferedPartnerLanguages = db.schema.define(
  "PrefferedPartnerLanguages",
  {
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    LanguageName: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "PrefferedPartnerLanguages",
    freezeTableName: true,
  }
);

export default PrefferedPartnerLanguages;
