import { Next, RequestInterface, ResponseInterface, SECRET } from "../index";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { Schema } from "../../../database/schema";
import { Model } from "sequelize";
import { PreflightInterface } from "../../models";

export async function requiresOtpVerification(
  req: RequestInterface,
  res: ResponseInterface,
  next: Next
) {
  try {
    const magicToken = req.headers["x-magic-token"];
    if (magicToken === undefined) {
      throw new createHttpError.UnavailableForLegalReasons(
        "Please create and verify your account first!"
      );
    } else {
      // verify magic token first
      if (typeof magicToken === "string") {
        const verifiedMagicToken: PreflightInterface = verify(
          magicToken,
          SECRET
        ) as PreflightInterface;
        const { otpCode } = req.body;

        if (verifiedMagicToken.otpCode !== otpCode)
          throw new createHttpError.BadRequest(
            `Invalid Otp!! please try again!!`
          );

        // check if OTP entered by user is correct
        const preflightResp: Model<
          any,
          any
        > | null = await Schema.Prefight.findOne({
          where: {
            id: verifiedMagicToken.id,
            otpCode: verifiedMagicToken.otpCode,
          },
        });

        if (preflightResp === null) {
          throw new createHttpError.Unauthorized(
            `Your Otp is incorrect! Please try again!`
          );
        } else {
          (req as any).userId = preflightResp.getDataValue("id");
          (req as any).email = preflightResp.getDataValue("email");
          (req as any).password = preflightResp.getDataValue("password");
          (req as any).phoneNumber = preflightResp.getDataValue("phoneNumber");

          // delete from un verified account list
          await Schema.Prefight.destroy({
            where: { id: preflightResp.getDataValue("id") },
          });
          return next();
        }
      }
    }
  } catch (e) {
    next(e);
  }
}
