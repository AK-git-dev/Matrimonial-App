import {
  Next,
  RequestInterface,
  ResponseInterface,
  SMS_SECRET_TOKEN,
} from "../index";
import createHttpError from "http-errors";
import { createHmac } from "crypto";

export async function requiresOtpVerification(
  req: RequestInterface,
  res: ResponseInterface,
  next: Next
) {
  try {
    const magicToken = req.headers["x-magic-token"];
    if (magicToken === undefined) {
      throw new createHttpError.UnavailableForLegalReasons(
        "Please register using OTP! You are not authorized!"
      );
    } else {
      // verify magic token first
      if (typeof magicToken === "string") {
        const [hashCode, expiresIn] = magicToken.split("."); // getting from headers
        const payload = req.body as { otpCode: string; phoneNumber: string }; // payload

        // check if OTP still works in valid time
        const nowTime: number = Date.now();
        if (nowTime > parseInt(expiresIn))
          throw new createHttpError.GatewayTimeout(
            "OTP has been expired! Please try again!"
          );

        // regenerate HASH for equality check
        const data: string = `${payload.phoneNumber}.${payload.otpCode}.${expiresIn}`;
        const newCalculatedHash: string = createHmac("sha256", SMS_SECRET_TOKEN)
          .update(data)
          .digest("hex");

        if (newCalculatedHash === hashCode) next();
        else throw new createHttpError.BadRequest("Incorrect OTP entered!!");
      }
    }
  } catch (e) {
    next(e);
  }
}
