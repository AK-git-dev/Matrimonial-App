import { compare } from "bcrypt";
import {
  NextFunction,
  Request as RQ,
  Response as RS,
} from "express-serve-static-core";
import createHttpError from "http-errors";
import { sign, verify } from "jsonwebtoken";
import { Model, Op } from "sequelize";
import { v4 } from "uuid";
import { TokenInterface } from "../models";
import { createHmac } from "crypto";
import environment from "dotenv";
import twilio from "twilio";
import { join } from "path";

import gcm from "node-gcm";
import { Schema } from "../../database/schema";

environment.config();

/** Twilio Secrets from .ENV file */
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID as string;
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN as string;
export const SMS_SECRET_TOKEN = process.env.SMS_SECRET_TOKEN as string;

/** Google GCM Secret */
export const FCM_SERVER_KEY = process.env.FCM_SERVER_KEY as string;

// Twilio Client Initialization
export const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

/** Required Types for Express.TS */
export type RequestInterface = RQ;
export type ResponseInterface = RS;
export type Next = NextFunction;
export const createError = createHttpError;

/** Utility functions */
export const SUCCESS = { status: true, statusCode: 200 };
export const uuid = v4;

/** Auth Environment Token SECRETS */
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET as string;
export const JWT_REFRESH_SECRET = process.env
  .JWT_REFRESH_TOKEN_SECRET as string;

/** FileUploadDirectory Path */
export const FileUploadDirectoryPath = join(
  __dirname,
  "..",
  "public",
  "uploads"
);

/** for serving as static assets - public/uploads */
export const FileUploadFolderStaticServe = join(__dirname, "..", "public");

// Acceptable FileFormat Only any type of images/*
export type AcceptableFileFormat = "image/*" | "application/pdf";

export interface FileUploadInterface {
  name: string;
  data: Buffer;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: AcceptableFileFormat;
  md5: string;
  mv: (saveFilePath: string) => Promise<any>;
}

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
  dbStoredPassword: string
): Promise<boolean> {
  return (await compare(password, dbStoredPassword)) as boolean;
}

/** Generate Auth Token from Resp */
export function generateAuthToken(resp: Model<any, any>): string {
  return sign(
    {
      userId: resp.getDataValue("id"),
      phoneNumber: resp.getDataValue("phoneNumber"),
    } as TokenInterface,
    JWT_ACCESS_SECRET,
    { expiresIn: "1d" }
  );
}

/** Generate RefreshToken */
export function generateRefreshToken(resp: Model<any, any>): string {
  return sign(
    {
      userId: resp.getDataValue("id"),
      phoneNumber: resp.getDataValue("phoneNumber"),
    } as TokenInterface,
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
}

/** Send Authenticated Response
 * when user signup account verification Succeeded
 * OR
 * when User Login Process Successfully Completes
 *  */

export function sendAuthenticatedResponseWhenVerificationCompletes(
  res: ResponseInterface,
  accessToken: string,
  refreshToken: string,
  resp: Model<any, any>,
  phoneNumber: string
) {
  return res
    .status(202)
    .cookie("accessToken", accessToken, {
      // accessToken Cookie
      expires: new Date(new Date().getTime() + 3600 * 1000),
      sameSite: "strict",
      httpOnly: true,
    })
    .cookie("refreshToken", refreshToken, {
      // refreshToken Cookie
      expires: new Date(new Date().getTime() + 7 * 3600 * 1000),
      sameSite: "strict",
      httpOnly: true,
    })
    .cookie("isLoggedIn", true, {
      expires: new Date(new Date().getTime() + 3600 * 1000),
    })
    .cookie("refreshTokenID", true, {
      expires: new Date(new Date().getTime() + 3600 * 1000),
    })
    .send({
      ...SUCCESS,
      accessToken,
      refreshToken,
      userId: resp.getDataValue("id"),
      phoneNumber,
      isLoggedIn: true,
    });
}

export async function verifyRefreshTokenValidity(
  token: string
): Promise<TokenInterface> {
  return verify(token, JWT_REFRESH_SECRET) as TokenInterface;
}

// generate 6 digit OTP
const generateOtpCode = (): string =>
  Math.ceil(1000 + Math.random() * 3131).toString();

export async function generateOtpAndTokenHash(
  phoneNumber: string
): Promise<{ otp: string; xMagicToken: string } | undefined> {
  try {
    const otp: string = generateOtpCode();
    const ttl = 2 * 60 * 1000; // 2 min validity
    const expiresIn = Date.now() + ttl;

    const data: string = `${phoneNumber}.${otp}.${expiresIn}`; // create a payload to encrypt in HASH
    const crytoHash256: string = createHmac("sha256", SMS_SECRET_TOKEN)
      .update(data)
      .digest("hex");
    const xMagicToken: string = `${crytoHash256}.${expiresIn}`;

    const twilioResp = 0; // await twilioClient.messages.create ({
    //     from :String (+12312411416) ,
    //     to :phoneNumber ,
    //     body :`Your one time password for Matrimony-Match ${otp}. OTP valid for only 2 minutes!`
    // })

    return { otp, xMagicToken };
  } catch (e) {
    return undefined;
  }
}

/** Google FCM Notification Sender and Gcm Instances */

// setting up sender ID with Google FCM API KEY
export const sender: gcm.Sender = new gcm.Sender(FCM_SERVER_KEY);
// setting up messenger to send notification over client devcies
export const gcmMessenger: gcm.Message = new gcm.Message();

// Getting collective Device tokens
export async function collectDeviceTokens(
  userId: string,
  profileId: string
): Promise<string[]> {
  return new Promise(
    async (
      resolve: (value: string[] | PromiseLike<string[]>) => void,
      reject
    ) => {
      try {
        const userDevicesTokens: Model<
          any,
          any
        >[] = await Schema.PushDevice.findAll({
          where: { UserId: { [Op.in]: [userId, profileId] } },
          attributes: ["token"],
        });

        const sanitizedToken: string[] = userDevicesTokens.map(
          (userToken: Model<any, any>) => userToken.getDataValue("token")
        ) as string[];

        resolve(sanitizedToken);
      } catch (error) {
        ``;
        reject(error);
      }
    }
  );
}
