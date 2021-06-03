import { FindOptions } from "sequelize";
import { Schema } from "../../database/schema";

// Do The Pagination on Profile Recommendation
export const paginate = async (
  query: any,
  { page, pageSize }: { page: number; pageSize: number }
): Promise<FindOptions<any>> => {
  const offset = page * pageSize;
  const limit = pageSize;

  return {
    ...query,
    offset,
    limit,
  };
};

// To Get The Details of All User and Related Information
export const getAllUsersWithAllDetails = async () =>
  await Schema.User.findAll({
    include: [
      { model: Schema.Education },
      { model: Schema.Address },
      { model: Schema.Caste },
      {
        model: Schema.LifeStyle,
        include: [
          { model: Schema.Movie, as: "favouriteMovies" },
          {
            model: Schema.VaccationDestination,
            as: "favoriteDestinationPlaces",
          },
          { model: Schema.Languages, as: "languagesCanSpeak" },
        ],
      },
      { model: Schema.UploadedDocument },
      { model: Schema.Occupation },
      {
        model: Schema.PrefferedPartnerChoice,
        include: [
          {
            model: Schema.PrefferedPartnerLanguages,
          },
        ],
      },
      { model: Schema.FamilyDetails },
      { model: Schema.ProfilPicture },
      { model: Schema.RelativeContact },
      { model: Schema.FavouritePerson },
      { model: Schema.PersonWhoFavouritedHimself },
    ],
  });
