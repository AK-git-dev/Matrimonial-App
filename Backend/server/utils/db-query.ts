import { FindOptions, Model, Op } from "sequelize";
import { Schema } from "../../database/schema";
import { Mode } from "fs";

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
    order: [["createdAt", "DESC"]],
    include: [
      { model: Schema.Education },
      { model: Schema.Address },
      { model: Schema.Caste },
      { model: Schema.MotherTongue },
      {
        model: Schema.LifeStyle,
        include: [{ model: Schema.Hobby }, { model: Schema.LifestyleLanguage }],
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
      {
        model: Schema.FavouritePerson,
        include: [
          {
            model: Schema.User,
            as: "personDeatils",
            attributes: ["id", "fullname", "age", "martialStatus"],
          },
        ],
      },
      {
        model: Schema.PersonWhoFavouritedHimself,
        include: [
          {
            model: Schema.User,
            as: "details",
            attributes: ["id", "fullname", "age", "martialStatus", "gender"],
          },
        ],
      },
      {
        model: Schema.RequestSend,
        include: [
          {
            model: Schema.User,
            attributes: ["id", "fullname", "age", "gender", "martialStatus"],
          },
        ],
      },
      {
        model: Schema.RequestReceived,
        include: [
          {
            model: Schema.User,
            attributes: ["id", "fullname", "age", "gender", "martialStatus"],
          },
        ],
      },
      {
        model: Schema.RequestAccepted,
        include: [
          {
            model: Schema.User,
            attributes: ["id", "fullname", "age", "gender", "martialStatus"],
          },
        ],
      },
    ],
  });

// Make Profile recommendations
export const generateProfileRecommendationsList = async (
  UserId: string
): Promise<Model<any, any>[]> => {
  const ppc: Model<any, any> = (await Schema.PrefferedPartnerChoice.findOne({
    where: { UserId },
  })) as Model<any, any>;
  const minHeight = ppc.getDataValue("minHeight");
  const maxHeight = ppc.getDataValue("maxHeight");
  const minAge = ppc.getDataValue("minAge");
  const maxAge = ppc.getDataValue("maxAge");
  const expectedSalary = ppc.getDataValue("expectedSalary");
  const caste = ppc.getDataValue("caste");
  const martitialStatus = ppc.getDataValue("martitialStatus");
  const occupation = ppc.getDataValue("occupation");

  const probableLists: Model<
    any,
    any
  >[] = await Schema.PrefferedPartnerChoice.findAll({
    where: {
      minHeight: { [Op.gte]: minHeight },
      maxHeight: { [Op.lte]: maxHeight },
      minAge: { [Op.gte]: minAge },
      maxAge: { [Op.lte]: maxAge },
      occupation: { [Op.like]: `%${occupation}%` },
      expectedSalary,
      caste,
      martitialStatus,
    },
    attributes: ["UserId"],
  });

  const userIds: string[] = probableLists.map((person) =>
    person.getDataValue("UserId")
  );

  const recommendedProfiles: Model<any, any>[] = [];

  for (const userId of userIds) {
    const resp = (await Schema.User.findByPk(userId)) as Model<any, any>;
    recommendedProfiles.push(resp);
  }

  return recommendedProfiles;
};
