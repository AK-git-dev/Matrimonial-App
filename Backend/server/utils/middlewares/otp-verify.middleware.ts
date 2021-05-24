import { Next, RequestInterface, ResponseInterface } from "../index";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { Schema } from "../../../database/schema";
import { Model } from "sequelize";

export const SECRET =
  "6ec77127cff92c61e5d098e5b3712b8122db56cc70afe080a528add0a161d135c406395a2836ac91531080361cb1f942952b4259e22032e9a7a745d315da3261";

/** Generate OtpCode | Magic Code **/
interface PreflightInterface {
  id: string;
  email: string;
  phoneNumber: string;
  otpCode: string;
}

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
          return next();
        }
      }
    }
  } catch (e) {
    next(e);
  }
}
