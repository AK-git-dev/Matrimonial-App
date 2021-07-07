import { Router } from "express";
import { Model } from "sequelize";
import { Schema } from "../../database/schema";
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
import { requiresAuth } from "../utils/middlewares/requires-auth.middleware";

const router = Router();

// [GET]: Sending Request to the User
router.get(
  "/send/:sendPersonId",
  requiresAuth,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const UserId: string = (req as any).userId;
      const sendPersonId: string = req.params.sendPersonId;

      await Schema.RequestSend.findOrCreate({
        where: {
          sendPersonId,
          UserId,
        },
      });

      return res.status(202).send({
        ...SUCCESS,
        message: "Request has been sent successfully!",
      });
    } catch (e) {
      next(e);
    }
  }
);

// [POST]: Remove send request from the person!
router.post(
  "/remove/request/:sendPersonUUID",
  requiresAuth,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const sendPersonUUID: string = req.params.sendPersonUUID; // <Primary Key>
      await Schema.RequestSend.destroy({ where: { id: sendPersonUUID } });

      return res.status(202).send({
        ...SUCCESS,
        message: "Request has been removed successfully!",
      });
    } catch (e) {
      next(e);
    }
  }
);

// [GET]: Showing Pending requests
router.get(
  "/pending/all",
  requiresAuth,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const UserId = (req as any).userId;

      const pendingRequests: Model<any, any>[] =
        await Schema.RequestSend.findAll({
          where: { UserId },
          include: [{ model: Schema.User, attributes: ["fullname", "age"] }],
          order: [["createdAt", "DESC"]],
        });
      return res.status(202).send({
        ...SUCCESS,
        message: "All pending requests",
        pendingRequests,
        count: pendingRequests.length,
      });
    } catch (e) {
      next(e);
    }
  }
);

// [POST] : Request Accepted Endpoint
router.post(
  "/accept/:friendID",
  requiresAuth,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const UserId: string = (req as any).userId;
      const sendPersonId: string = req.params.friendID;

      const resp = await Schema.RequestAccepted.findOrCreate({
        where: { UserId, friendID: sendPersonId },
      });
      if (resp === null)
        new createError.NotAcceptable(
          "Request cannot be processed right now! Person has changed request policies"
        );

      // Sending Push Notification
      gcmMessenger.addNotification({
        title: "Request Accepted",
        body: "Voila! Your connection request has been accepted! Grow your interest!!",
        icon: "ic_launcher",
      });

      const registrationTokens: string[] = await collectDeviceTokens(
        UserId,
        sendPersonId
      );

      sender.send(gcmMessenger, registrationTokens, (err, _) => {
        if (err) new createError.Forbidden("Device Token Not found");
      });

      return res.status(202).send({
        ...SUCCESS,
        message: "Request has been accepted successfully!",
      });
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/accepted/all",
  requiresAuth,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const UserId: string = (req as any).userId;
      const acceptedProfiles = await Schema.RequestAccepted.findAll({
        where: { UserId },
        include: [{ model: Schema.User }],
      });

      return res.status(202).send({
        ...SUCCESS,
        message: "List of all accepted connection profiles",
        acceptedProfiles,
        count: acceptedProfiles.length,
      });
    } catch (e) {
      next(e);
    }
  }
);

export default router;
