import { Router } from "express";
import { requiresAuth } from "../utils/middlewares/requires-auth.middleware";
import { Next, RequestInterface, ResponseInterface, SUCCESS } from "../utils";
import { Schema } from "../../database/schema";

const router = Router();

// [GET]: All Mutual Connection matches
router.get(
  "/",
  requiresAuth,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const UserId = (req as any).userId;
      const favoritePersonIds: string[] = (
        await Schema.FavouritePerson.findAll({
          where: { UserId },
          attributes: ["favouritePersonId"],
        })
      ).map((fp) => fp.get("favouritePersonId")) as string[];

      const mutualMatches = [];
      for (const fid of favoritePersonIds) {
        mutualMatches.push(
          await Schema.PersonWhoFavouritedHimself.findOne({
            where: { personWhoFavoritedYouID: fid },
            include: [
              {
                model: Schema.User,
                as: "details",
                attributes: ["id", "fullname", "age", "gender"],
              },
            ],
          })
        );
      }

      return res.status(202).send({
        ...SUCCESS,
        message: "Lists of Mutual Matches",
        count: favoritePersonIds.length,
        mutualMatches,
      });
    } catch (e) {
      next(e);
    }
  }
);

export default router;
