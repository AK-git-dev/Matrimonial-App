import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";
import LifeStyle from "./lifeStyle.schema";

const Hobby = db.schema.define(
  "Hobbies",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    hobby: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      allowNull: false,
    },
    LifeStyleId: {
      type: DataTypes.UUID,
      allowNull : false,
      references: {
        model: LifeStyle,
        key: 'id'
      }
    }
  },
  {
    freezeTableName: true,
    tableName: "Hobbies",
    indexes: [
      {fields: ['hobby']}
    ],
    hooks: {
      beforeValidate: function (payload, options) {
        (payload as any).name = ((payload as any).name as string).toLowerCase();
      },
    },
  }
);

export default Hobby;
