import {compare} from "bcrypt";
import {NextFunction , Request as RQ , Response as RS ,} from "express-serve-static-core";
import createHttpError from "http-errors";
import {sign} from "jsonwebtoken";
import {Model} from "sequelize";
import {v4} from "uuid";
import {Schema} from "../../database/schema";
import {PreflightInterface , SignupInterface , TokenInterface} from "../models";
import * as crypto from "crypto";
import {createHmac} from "crypto";
import environment from "dotenv";
import twilio from 'twilio';

environment.config ();

/** Twilio Secrets from .ENV file */
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID as string;
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN as string;
export const SMS_SECRET_TOKEN = process.env.SMS_SECRET_TOKEN as string;

// Twilio Client Initialization
export const twilioClient = twilio (TWILIO_ACCOUNT_SID , TWILIO_AUTH_TOKEN);


/** Required Types for Express.TS */
export type RequestInterface = RQ;
export type ResponseInterface = RS;
export type Next = NextFunction;
export const createError = createHttpError;

/** Utility functions */
export const SUCCESS = {status :true , statusCode :200};
export const uuid = v4;

/** Auth Environment Token SECRETS */
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET as string;
export const JWT_REFRESH_SECRET = process.env
    .JWT_REFRESH_TOKEN_SECRET as string;

/**
 * Control Error Routes
 */

export function warn(err: any , res: ResponseInterface): void {
    res.status (err.status || 500).send ({
        error :{
            status :err.status || 500 ,
            message :err.message ,
        } ,
    });
}

/** Set Authorization Header */
export function setAuthorizationHeader(res: any , token: string) {
    res.setHeader ("authorization" , `Bearer ${token}`);
}

/** Check For Password Matches with HashedPassword */
export async function compareWithHashifiedPassword(
    password: string ,
    dbStoredPassword: string
): Promise<boolean> {
    return (await compare (password , dbStoredPassword)) as boolean;
}

/** Generate Auth Token from Resp */
export function generateAuthToken(resp: Model<any , any>): string {
    return sign (
        {
            userId :resp.getDataValue ("id") ,
            email :resp.getDataValue ("email") ,
            phoneNumber :resp.getDataValue ("phoneNumber") ,
        } as TokenInterface ,
        JWT_ACCESS_SECRET ,
        {expiresIn :"2h"}
    );
}

/** Generates OTP CODE for account verification **/
export function generateMagicToken(payload: Model<any , any>): string {
    return sign (
        {
            id :payload.getDataValue ("id") ,
            email :payload.getDataValue ("email") ,
            phoneNumber :payload.getDataValue ("phoneNumber") ,
            otpCode :payload.getDataValue ("otpCode") ,
        } as PreflightInterface ,
        JWT_ACCESS_SECRET ,
        {expiresIn :"62s"}
    );
}

/** Check for Email Or Password already exists in Pre-signup process */
export async function checkEmailOrPhoneNumberAlreadyExists(
    res: ResponseInterface ,
    payload: SignupInterface
) {
    /** Check for already user  account exists or not */
    const isEmailExists = await Schema.Prefight.findOne ({
        where :{email :payload.email} ,
    });
    if (isEmailExists != null) {
        (isEmailExists as any).otpCode = crypto.randomBytes (3).toString ("hex");
        await isEmailExists.save ();

        const magicToken = generateMagicToken (isEmailExists);
        return res.status (200).send ({
            ...SUCCESS ,
            otpCode :isEmailExists.getDataValue ("otpCode") ,
            magicToken ,
            message :"Please verify with the OTP code already sent!" ,
            otpValidity :"1 min" ,
        });
    }
    /** If Phone number already exists **/
    const isPhoneNumberExists = await Schema.Prefight.findOne ({
        where :{phoneNumber :payload.phoneNumber} ,
    });
    if (isPhoneNumberExists != null) {
        (isPhoneNumberExists as any).otpCode = crypto
            .randomBytes (3)
            .toString ("hex");
        await isPhoneNumberExists.save ();

        const magicToken = generateMagicToken (isPhoneNumberExists);
        return res.status (200).send ({
            ...SUCCESS ,
            otpCode :isPhoneNumberExists.getDataValue ("otpCode") ,
            otpValidity :"1 min" ,
            magicToken ,
            message :"Please verify with the OTP code already sent!" ,
        });
    }
}

// generate 6 digit OTP
const generateOtpCode = (): string =>
    Math.ceil (100000 + Math.random () * 131313).toString ();

export async function generateOtpAndTokenHash(
    phoneNumber: string
): Promise<{ otp: string, fullHash: string, twilioResp: any } | undefined> {
    try {

        const otp: string = generateOtpCode ();
        const ttl = 2 * 60 * 1000; // 2 min validity
        const expiresIn = Date.now () + ttl;

        const data: string = `${phoneNumber}.${otp}.${expiresIn}`; // create a payload to encrypt in HASH
        const crytoHash256: string = createHmac ('sha256' , SMS_SECRET_TOKEN).update (data).digest ('hex');
        const fullHash: string = `${crytoHash256}.${expiresIn}`;

        const twilioResp = await twilioClient.messages.create ({
            from :String (+12312411416) ,
            to :phoneNumber ,
            body :`Your one time password for Matrimony-Match ${otp}. OTP valid for only 2 minutes!`
        })

        return {otp , fullHash , twilioResp};
    } catch (e) {
        return undefined;
    }


}
