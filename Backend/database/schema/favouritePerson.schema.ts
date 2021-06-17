import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import { db } from "..";
import PersonWhoFavouritedYou from "./personWhoFavoriteYou.schema";
import User from "./user.schema";

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
      references: {
        model: User,
        key: "id",
      },
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
        const whoIsFavoritingYou = payload.UserId; //{UserId, FavoritePersonID}

        /*
                  If person already present do nothing
                 */

        PersonWhoFavouritedYou.findOne({
          where: {
            personWhoFavoritedYouID: whoIsFavoritingYou,
            UserId: payload.favouritePersonId,
          },
        }).then((m) => {
          if (m === null) {
            PersonWhoFavouritedYou.create({
              personWhoFavoritedYouID: whoIsFavoritingYou,
              UserId: payload.favouritePersonId,
            })
              .then((r) =>
                console.log(
                  `${payload.favouritePersonId} marked as favorite by ${payload.UserId}`
                )
              )
              .catch((e) => console.error(e));
          }
        });
      },
    },
  }
);

export default FavouritePerson;
