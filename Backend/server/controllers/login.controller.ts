import { Router } from "express";
import { Model } from "sequelize";
import { Schema } from "../../database/schema";
import {
  createError,
  generateAuthToken,
  generateOtpAndTokenHash,
  generateRefreshToken,
  Next,
  RequestInterface,
  ResponseInterface,
  sendAuthenticatedResponseWhenVerificationCompletes,
  setAuthorizationHeader,
  SUCCESS
} from "../utils";
import { requiresOtpVerification } from "../utils/middlewares/otp-verify.middleware";

const router = Router();

// [POST]: User login controller With OTP

router.post(
  "/with-otp",
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const { phoneNumber } = req.body;
      // check valid phone or not
      if (phoneNumber.length < 5 || phoneNumber.length > 15)
        throw new createError.UnprocessableEntity(
          `phone number is not valid, must be more than 5 and less than 13 digits`
        );

      // check if phoneNumber is a registeredUser or not
      const isUserExists = await Schema.User.findOne({
        where: { phoneNumber },
      });

      if (isUserExists === null)
        throw new createError.BadRequest(
          "Sorry!, you are not registered with this phone number"
        );

      const ifTokenGenerated = await generateOtpAndTokenHash(phoneNumber);
      if (typeof ifTokenGenerated === "undefined")
        throw new createError.RequestTimeout(
          `Secure OTP could not be generated! Check your network connection`
        );

      const accessToken: string = generateAuthToken(isUserExists);
      const refreshToken: string = generateRefreshToken(isUserExists);
      setAuthorizationHeader(res, accessToken);

      return res.status(200).send({
        ...SUCCESS,
        otpCode: ifTokenGenerated.otp,
        message: `Your one time password for Matrimony-Match ${ifTokenGenerated.otp}. OTP valid for only 2 minutes!`,
        xMagicToken: ifTokenGenerated.xMagicToken,
        otpValidity: "2 minutes",
      });
    } catch (e) {
      next(e);
    }
  }
);

// [POST]: User login success verification OTPCode sent to the user
router.post(
  "/otp/verify",
  requiresOtpVerification,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    async function checkPhoneNumberAlreadyExists(phoneNumber: string) {
      const isPhoneNumberRegisted = await Schema.User.findOne({
        where: { phoneNumber },
      });
      if (isPhoneNumberRegisted === null)
        throw new createError.Conflict(
          "Seems, You do not have any account! Please Sign up first!"
        );
      return isPhoneNumberRegisted;
    }

    try {
      const { phoneNumber } = req.body as {
        otpCode: string;
        phoneNumber: string;
      }; // payload
      const userResp: Model<any, any> = (await Schema.User.findOne({
        where: { phoneNumber },
      })) as Model<any, any>;

      const resp = await checkPhoneNumberAlreadyExists(phoneNumber);
      const accessToken: string = await generateAuthToken(resp);
      const refreshToken: string = await generateRefreshToken(resp);
      setAuthorizationHeader(res, accessToken);

      return sendAuthenticatedResponseWhenVerificationCompletes(
        res,
        accessToken,
        refreshToken,
        resp,
        phoneNumber
      );
    } catch (e) {
      next(e);
    }
  }
);

export default router;
