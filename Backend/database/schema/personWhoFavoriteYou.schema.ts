import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";

const uuid = v4;

const PersonWhoFavouritedHimself = db.schema.define(
  "PersonWhoFavouritedYou",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    personWhoFavoritedYouID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "PersonWhoFavouritedYou",
    hooks: {
      beforeValidate: function (favouritePerson: any, options) {
        favouritePerson.id = uuid();
      },
    },
  }
);

export default PersonWhoFavouritedHimself;
