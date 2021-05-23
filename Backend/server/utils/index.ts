import { compare } from "bcrypt";
import {
  NextFunction,
  Request as RQ,
  Response as RS,
} from "express-serve-static-core";
import createHttpError from "http-errors";
import { sign } from "jsonwebtoken";
import { Model } from "sequelize";
import { v4 } from "uuid";

/** Required Types for Express.TS */
export type RequestInterface = RQ;
export type ResponseInterface = RS;
export type Next = NextFunction;
export const createError = createHttpError;

/** Utility functions */
export const SUCCESS = { status: true, statusCode: 200 };
export const uuid = v4;

/** Set Authorization Header */
export function setAuthorizationHeader(res: any, token: string) {
  res.setHeader("authorization", `Bearer ${token}`);
}

/** Check For Password Matches with HashedPassword */
export async function compareWithHashifiedPassword(
  password: string,
  checkIfUserNameExists: any
): Promise<boolean> {
  return (await compare(password, checkIfUserNameExists.password)) as boolean;
}

/** JSONWebToken SECRET */
export const SECRET =
  "6ec77127cff92c61e5d098e5b3712b8122db56cc70afe080a528add0a161d135c406395a2836ac91531080361cb1f942952b4259e22032e9a7a745d315da3261";

type TokenInterface = {
  id: string;
  email: string;
  phoneNumber: string;
};
/** Generate Auth Token from Resp */
export function generateAuthToken(resp: Model<any, any>): string {
  return sign(
    {
      id: resp.getDataValue("id"),
      email: resp.getDataValue("email"),
      phoneNumber: resp.getDataValue("phoneNumber"),
    } as TokenInterface,
    SECRET,
    { expiresIn: "2h" }
  );
}
