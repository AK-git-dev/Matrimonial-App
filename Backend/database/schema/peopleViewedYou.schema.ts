import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";
const uuid = v4;

const PeopleWhoViewedYou = db.schema.define(
  "PeopleWhoViewedYou",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    personWhoViewedId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "PeopleWhoViewedYou",
    hooks: {
      beforeValidate: function (payload: any, options) {
        payload.id = uuid();
      },
    },
  }
);

export default PeopleWhoViewedYou;
