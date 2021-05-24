import { Router } from "express";
import { Schema } from "../../database/schema";
import { CreateProfileInterface, SignupInterface } from "../models";
import {
  checkEmailOrPhoneNumberAlreadyExists,
  createError,
  generateAuthToken,
  generateMagicToken,
  Next,
  RequestInterface,
  ResponseInterface,
  setAuthorizationHeader,
  SUCCESS,
  warn,
} from "../utils";
import { requiresMinimumAge } from "../utils/middlewares/age-restrictor.middleware";
import { requiresOtpVerification } from "../utils/middlewares/otp-verify.middleware";

const router = Router();

// [POST] : When User is going to create account for the first time.
router.post(
  "/signup",
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const payload: SignupInterface = req.body as SignupInterface;
      const status = await checkEmailOrPhoneNumberAlreadyExists(res, payload);
      if (status === undefined) {
        // If User already have verified account
        const isUserVerified = await Schema.User.findOne({
          where: { email: payload.phoneNumber },
        });
        if (isUserVerified)
          throw new createError.Conflict(
            `you already have an account! Please log into your account`
          );

        const resp = await Schema.Prefight.create(payload);
        const magicToken = generateMagicToken(resp);

        return res.status(200).send({
          ...SUCCESS,
          otpCode: resp.getDataValue("otpCode"),
          message: "Please verify with the OTP code already sent!",
          magicToken,
          otpValidity: "1 min",
        });
      }
    } catch (error) {
      next(warn(error, res));
    }
  }
);

// [POST] : Verify user account using OTP CODE generated
router.post(
  "/account/verify/otp",
  requiresOtpVerification,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const { userId, email, password, phoneNumber } = req as any;
      // OTP has been verified &&
      // send the ACK to the client to proceed with profile building part

      const payload = { id: userId, email, password, phoneNumber };
      const resp = await Schema.User.create(payload);
      const token: string = generateAuthToken(resp);
      setAuthorizationHeader(res, token);

      return res.status(200).send({
        ...SUCCESS,
        token,
        userId: userId,
        email,
      });
    } catch (e) {
      next(warn(e, res));
    }
  }
);

// [POST]: Create Profile after Signup
router.post(
  "/create-profile/:userId",
  requiresMinimumAge,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const userId = req.params.userId;
      const payload: CreateProfileInterface = req.body as CreateProfileInterface;

      return res.status(200).send({
        ...SUCCESS,
        userId,
        payload,
        isLoggedIn: true,
      });
    } catch (error) {
      next(warn(error, res));
    }
  }
);

export default router;
