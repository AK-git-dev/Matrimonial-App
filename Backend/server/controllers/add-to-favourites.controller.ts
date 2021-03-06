import { Router } from "express";
import { requiresAuth } from "../utils/middlewares/requires-auth.middleware";
import {
  collectDeviceTokens,
  createError,
  gcmMessenger,
  Next,
  RequestInterface,
  ResponseInterface,
  sender,
  SUCCESS,
} from "../utils";
import { Schema } from "../../database/schema";
import createHttpError from "http-errors";
import { Model, Op } from "sequelize";

const router = Router();

// [POST]: Add to Favorite With Notifaction
router.post(
  "/add-to-favourites/:profileId",
  requiresAuth,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const UserId: string = (req as any).userId;
      const profileId: string = req.params.profileId;

      const userExists = await Schema.User.findByPk(profileId);
      if (userExists === null)
        throw new createHttpError.BadRequest(
          "Interest person has some privacy options enabled!"
        );

      const alreadyAddedToFavourite = await Schema.FavouritePerson.findOne({
        where: {
          favouritePersonId: profileId,
          UserId,
        },
      });

      if (alreadyAddedToFavourite)
        throw new createHttpError.BadRequest(
          `You have already added ${userExists.getDataValue(
            "fullname"
          )} in your favourites`
        );

      await Schema.FavouritePerson.create({
        favouritePersonId: profileId,
        UserId,
      });

      // Sending Push Notification
      gcmMessenger.addNotification({
        title: "New Match Found!",
        body: "Yo! You gotta new matches! Check'em out",
        icon: "ic_launcher",
      });

      const registrationTokens: string[] = await collectDeviceTokens(
        UserId,
        profileId
      );

      sender.send(gcmMessenger, registrationTokens, (err, _) => {
        if (err) new createError.Forbidden("Device Token Not found");
      });

      /*
       * Register an event to send notification to the user2 who has been favoured
       */

      return res.status(202).send({
        ...SUCCESS,
        message: `${userExists.getDataValue(
          "fullname"
        )} has been added to your favorite person to interest!`,
      });
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/remove-from-favourites/:profileId",
  requiresAuth,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const UserId: string = (req as any).userId;
      const profileId: string = req.params.profileId;

      await Schema.FavouritePerson.destroy({
        where: { favouritePersonId: profileId, UserId },
      });
      // await Schema.PersonWhoFavouritedHimself.destroy({where: { personWhoFavoritedYouID: UserId,
      //         UserId: profileId}});

      return res.status(202).send({
        ...SUCCESS,
        message: `Person has been removed successfully from your favourite list!`,
      });
    } catch (e) {
      next(e);
    }
  }
);

export default router;
