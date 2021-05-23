import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";
import PersonWhoFavouritedYou from "./personWhoFavoriteYou.schema";

const uuid = v4;

const FavouritePerson = db.schema.define(
  "FavouritePersons",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    favouritePersonId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "FavouritePersons",
    hooks: {
      beforeValidate: function (favouritePerson: any, options) {
        favouritePerson.id = uuid();
      },
      beforeCreate: function (payload: any, options) {
        const whoIsFavoritingYou = payload.userId;

        PersonWhoFavouritedYou.create({
          personWhoFavoritedYouID: whoIsFavoritingYou,
        })
          .then((r) =>
            console.log(
              `${whoIsFavoritingYou} marked as favorited by ${payload.userId}`
            )
          )
          .catch((e) => console.error(e));
      },
    },
  }
);

export default FavouritePerson;
