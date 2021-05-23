import { Router } from "express";
import { Schema } from "../../database/schema";
import { SignupInterface } from "../models";
import {
  createError,
  generateAuthToken,
  Next,
  RequestInterface,
  ResponseInterface,
  setAuthorizationHeader,
  SUCCESS
} from "../utils";

const router = Router();

router.post(
  "/signup",
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const payload: SignupInterface = req.body as SignupInterface;

      /** Check for already user  account exists or not */
      const isEmailExists = await Schema.User.findOne({
        where: { email: payload.email },
      });
      if (isEmailExists != null)
        throw new createError.Conflict(
          `${payload.email} is already been registered!`
        );

      const resp = await Schema.User.create(payload);
      const token = generateAuthToken(resp);
      setAuthorizationHeader(res, token);

      return res.status(200).send({
        ...SUCCESS,
        userId: resp.getDataValue("id"),
        isLoggedIn: true,
      });
    } catch (error) {
      return next(error);
    }
  }
);

export default router;
