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
import { Schema } from "../../database/schema";
import { SignupInterface } from "../models";
import * as crypto from "crypto";

/** Required Types for Express.TS */
export type RequestInterface = RQ;
export type ResponseInterface = RS;
export type Next = NextFunction;
export const createError = createHttpError;

/** Utility functions */
export const SUCCESS = { status: true, statusCode: 200 };
export const uuid = v4;

/**
 * Control Error Routes
 */

export function warn(err: any, res: ResponseInterface): void {
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
}

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

/** Generate OtpCode | Magic Code **/
interface PreflightInterface {
  id: string;
  email: string;
  phoneNumber: string;
  otpCode: string;
}

export function generateMagicToken(payload: Model<any, any>): string {
  return sign(
    {
      id: payload.getDataValue("id"),
      email: payload.getDataValue("email"),
      phoneNumber: payload.getDataValue("phoneNumber"),
      otpCode: payload.getDataValue("otpCode"),
    } as PreflightInterface,
    SECRET,
    { expiresIn: "62s" }
  );
}

/** Check for Email Or Password already exists */
export async function checkEmailOrPhoneNumberAlreadyExists(
  res: ResponseInterface,
  payload: SignupInterface
) {
  /** Check for already user  account exists or not */
  const isEmailExists = await Schema.Prefight.findOne({
    where: { email: payload.email },
  });
  if (isEmailExists != null) {
    (isEmailExists as any).otpCode = crypto.randomBytes(3).toString("hex");
    await isEmailExists.save();

    const magicToken = generateMagicToken(isEmailExists);
    return res.status(200).send({
      ...SUCCESS,
      otpCode: isEmailExists.getDataValue("otpCode"),
      magicToken,
      message: "Please verify with the OTP code already sent!",
      otpValidity: "1 min",
    });
  }
  /** If Phone number already exists **/
  const isPhoneNumberExists = await Schema.Prefight.findOne({
    where: { phoneNumber: payload.phoneNumber },
  });
  if (isPhoneNumberExists != null) {
    (isPhoneNumberExists as any).otpCode = crypto
      .randomBytes(3)
      .toString("hex");
    await isPhoneNumberExists.save();

    const magicToken = generateMagicToken(isPhoneNumberExists);
    return res.status(200).send({
      ...SUCCESS,
      otpCode: isPhoneNumberExists.getDataValue("otpCode"),
      otpValidity: "1 min",
      magicToken,
      message: "Please verify with the OTP code already sent!",
    });
  }
}
