import { db } from "../index";
import { DataTypes } from "sequelize";
import Languages from "./languages.schema";
import LifeStyle from "./lifeStyle.schema";
import {uuid} from "../../server/utils";

const LifestyleLanguage = db.schema.define(
  "lifestyleLanguages",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(80),
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
    indexes: [
      {fields: ['name']}
    ],
    hooks: {
      beforeValidate(payload, options) {
        (payload as any).id = uuid();
      }
    }
  }
);

export default LifestyleLanguage;
