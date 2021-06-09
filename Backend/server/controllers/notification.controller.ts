import { Router } from "express";
import { Schema } from "../../database/schema";
import {
  FCM_SERVER_KEY,
  Next,
  RequestInterface,
  ResponseInterface,
  SUCCESS,
} from "../utils";

import gcm from "node-gcm";
import createHttpError from "http-errors";

const router = Router();

// [GET]: Send Notification Beta1.0.0
router.get(
  "/",
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const customNotification = {
        title: "You got a Match",
        text: "Please visit your profile matches",
      };

      // getting android devices tokens
      const androidDeviceTokens = await Schema.PushDevice.findAll({
        attributes: ["token"],
        where: {
          platform: "android",
        },
      });

      // building token arrays
      const tokens: string[] = androidDeviceTokens.map((androidDeviceToken) =>
        androidDeviceToken.get("token")
      ) as string[];

      // setting up sender ID with Google FCM API KEY
      var sender: gcm.Sender = new gcm.Sender(FCM_SERVER_KEY);

      // preparing notifications to be send
      var gcmMessages: gcm.Message = new gcm.Message();
      gcmMessages.addNotification({
        title: "New Match Found!",
        body: "Yo! You gotta new matches! Check'em out",
        icon: "ic_launcher",
      });

      // now send notifications
      sender.send(
        gcmMessages,
        { registrationTokens: tokens },
        (err: any, resp: gcm.IResponseBody) => {
          if (err) throw new createHttpError.BadRequest(err);
          else console.log(resp);
        }
      );

      return res.status(202).send({
        ...SUCCESS,
        message: "bulk notifications has been sent",
      });
    } catch (error) {
      next(error);
    }
  }
);

// [POST]: Send Notification Testing

router.post(
  "/registerDeviceToken/:platform/:uuid/:token",
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const platform: string = req.params.platform;
      const uuid: string = req.params.uuid;
      const token: string = req.params.token;

      const whereQuery = {
        uuid,
        platform,
      };

      await Schema.PushDevice.findOrCreate({ where: whereQuery }).catch(
        (e) => new Error(e)
      );

      // updateToken
      await Schema.PushDevice.update({ token }, { where: whereQuery });
      return res.status(202).send({
        ...SUCCESS,
        message: `Device with ${token} has been registered for notifications`,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
