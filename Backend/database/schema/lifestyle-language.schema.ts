import { db } from "../index";
import { DataTypes } from "sequelize";
import Languages from "./languages.schema";
import LifeStyle from "./lifeStyle.schema";

const LifestyleLanguage = db.schema.define(
  "lifestyleLanguages",
  {
    name: {
      type: DataTypes.STRING(80),
      primaryKey: true,
      allowNull: false,
      references: {
        model: Languages,
        key: "name",
      },
    },
    LifeStyleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: LifeStyle,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    tableName: "lifestyleLanguages",
  }
);

export default LifestyleLanguage;
