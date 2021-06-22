import { Router } from "express";
import { Model } from "sequelize";
import {
  createError,
  Next,
  RequestInterface,
  ResponseInterface,
  SUCCESS,
} from "../utils";
import { getUserDetailsById } from "../utils/db-query";
import { requiresAuth } from "../utils/middlewares/requires-auth.middleware";

const router = Router();

// [GET] : Specific User Basic Details
router.get(
  "/details",
  requiresAuth,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const UserId: string = (req as any).userId;
      const userDetails: Model<any, any> | null = await getUserDetailsById(
        UserId
      );

      if (userDetails === null) new createError.Forbidden("User not exists!");

      return res.status(202).send({
        ...SUCCESS,
        userDetails,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
