import {
  createError,
  Next,
  RequestInterface,
  ResponseInterface,
  JWT_ACCESS_SECRET,
} from "../index";
import { verify } from "jsonwebtoken";

export async function loginOtpVerification(
  phoneNumber: string,
  otp: string,
  token: string
) {
  const verifiedOtpAndToken = verify(token, JWT_ACCESS_SECRET) as {
    otp: string;
    phoneNumber: string;
  };
  if (
    otp !== verifiedOtpAndToken.otp ||
    phoneNumber !== verifiedOtpAndToken.phoneNumber
  )
    throw new createError.NotAcceptable(
      `Otp code is not valid according to the phone number!`
    );
}

export async function requiredLoginOtpVerification(
  req: RequestInterface,
  res: ResponseInterface,
  next: Next
) {
  try {
    /// check for header token x-login-token
    const loginToken: string | undefined = req.headers[
      "x-login-token"
    ] as string;
    if (loginToken === undefined)
      throw new createError.BadRequest(
        "Your otp verification cannot be processed!"
      );

    const token = loginToken.split(" ")[1];

    const phoneNumber = req.params.phoneNumber;
    const { otp } = req.body;
    await loginOtpVerification(phoneNumber, otp, token);

    (res as any).phoneNumber = phoneNumber;

    next();
  } catch (e) {
    next(e);
  }
}
