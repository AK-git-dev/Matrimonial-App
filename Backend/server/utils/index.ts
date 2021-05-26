import {compare} from "bcrypt";
import {NextFunction , Request as RQ , Response as RS ,} from "express-serve-static-core";
import createHttpError from "http-errors";
import {sign , verify} from "jsonwebtoken";
import {Model} from "sequelize";
import {v4} from "uuid";
import {TokenInterface} from "../models";
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
            phoneNumber :resp.getDataValue ("phoneNumber") ,
        } as TokenInterface ,
        JWT_ACCESS_SECRET ,
        {expiresIn :"1d"}
    );
}

/** Generate RefreshToken */
export function generateRefreshToken(resp: Model<any , any>): string {
    return sign ({
        userId :resp.getDataValue ("id") ,
        phoneNumber :resp.getDataValue ("phoneNumber") ,
    } as TokenInterface , JWT_REFRESH_SECRET , {expiresIn :'7d'})
}

/** Send Authenticated Response
 * when user signup account verification Succeeded
 * OR
 * when User Login Process Successfully Completes
 *  */

export function sendAuthenticatedResponseWhenVerificationCompletes(res: ResponseInterface , accessToken: string , refreshToken: string , resp: Model<any , any> , phoneNumber: string) {
    return res.status (202).cookie ('accessToken' , accessToken , {
        // accessToken Cookie
        expires :new Date (new Date ().getTime () + 3600 * 1000) ,
        sameSite :'strict' ,
        httpOnly :true
    }).cookie ('refreshToken' , refreshToken , {
        // refreshToken Cookie
        expires :new Date (new Date ().getTime () + 7 * 3600 * 1000) ,
        sameSite :'strict' ,
        httpOnly :true
    }).cookie ('isLoggedIn' , true , {expires :new Date (new Date ().getTime () + 3600 * 1000)}).send ({
        ...SUCCESS ,
        accessToken ,
        refreshToken ,
        userId :resp.getDataValue ('id') ,
        phoneNumber ,
        isLoggedIn :true ,
    });
}

export async function verifyRefreshTokenValidity(token: string): Promise<TokenInterface> {
    return verify (token , JWT_REFRESH_SECRET) as TokenInterface;
}


// generate 6 digit OTP
const generateOtpCode = (): string =>
    Math.ceil (100000 + Math.random () * 131313).toString ();

export async function generateOtpAndTokenHash(
    phoneNumber: string
): Promise<{ otp: string, xMagicToken: string } | undefined> {
    try {

        const otp: string = generateOtpCode ();
        const ttl = 2 * 60 * 1000; // 2 min validity
        const expiresIn = Date.now () + ttl;

        const data: string = `${phoneNumber}.${otp}.${expiresIn}`; // create a payload to encrypt in HASH
        const crytoHash256: string = createHmac ('sha256' , SMS_SECRET_TOKEN).update (data).digest ('hex');
        const xMagicToken: string = `${crytoHash256}.${expiresIn}`;

        const twilioResp = 0; // await twilioClient.messages.create ({
        //     from :String (+12312411416) ,
        //     to :phoneNumber ,
        //     body :`Your one time password for Matrimony-Match ${otp}. OTP valid for only 2 minutes!`
        // })

        return {otp , xMagicToken};
    } catch (e) {
        return undefined;
    }
}
