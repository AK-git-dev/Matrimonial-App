import { Schema } from "../../database/schema";

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
          { model: Schema.VaccationDestination, as: "honeymoonPlaces" },
          { model: Schema.Languages, as: "languagesCanSpeak" },
        ],
      },
      { model: Schema.UploadedDocument },
      { model: Schema.Occupation },
      {model: Schema.PrefferedPartnerChoice},
      { model: Schema.FamilyDetails },
      { model: Schema.ProfilPicture },
      { model: Schema.RelativeContact },
      { model: Schema.FavouritePerson },
      { model: Schema.PersonWhoFavouritedHimself },
    ],
  });
