import {Router} from "express";

import SignupController from "./signup.controller";
import LoginController from "./login.controller";
import {
    JWT_ACCESS_SECRET ,
    Next ,
    RequestInterface ,
    ResponseInterface ,
    SUCCESS ,
    verifyRefreshTokenValidity ,
} from "../utils";
import createHttpError from "http-errors";
import {Schema} from "../../database/schema";
import {TokenInterface} from "../models";
import {sign} from "jsonwebtoken";

const router = Router ();

// [POST]: Generating Refresh Tokens
router.post (
    "/refreshToken" ,
    async (req: RequestInterface , res: ResponseInterface , next: Next) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken)
                throw new createHttpError.Forbidden (
                    "Refresh Token not found! Please login again!"
                );

            // check if present in database
            const isTokenExists = await Schema.RefreshToken.findByPk (refreshToken);
            if (isTokenExists === null)
                throw new createHttpError.Forbidden (
                    "Refresh token blocked!, Please login again!"
                );

            const verifiedRefreshToken: TokenInterface = await verifyRefreshTokenValidity (
                refreshToken
            );

            const accessToken: string = await sign (
                {...verifiedRefreshToken} ,
                JWT_ACCESS_SECRET ,
                {expiresIn :"1d"}
            );

            return res
                .status (202)
                .cookie ("accessToken" , accessToken , {
                    // accessToken Cookie
                    expires :new Date (new Date ().getTime () + 3600 * 1000) ,
                    sameSite :"strict" ,
                    httpOnly :true ,
                })
                .cookie ("isLoggedIn" , true , {
                    expires :new Date (new Date ().getTime () + 3600 * 1000) ,
                })
                .send ({
                    ...SUCCESS ,
                    accessToken ,
                    refreshToken ,
                    message :"previous session destroyed" ,
                    isLoggedIn :true ,
                });
        } catch (e) {
            next (e);
        }
    }
);

router.use ("/signup" , SignupController);
router.use ("/login" , LoginController);

router.get (
    "/logout" ,
    async (req: RequestInterface , res: ResponseInterface , next: Next) => {
        res
            .status (200)
            .clearCookie ("refreshToken")
            .clearCookie ("accessToken")
            .clearCookie ("isLoggedIn")
            .clearCookie ('refreshTokenID')
            .send ({
                ...SUCCESS ,
                message :"You are now logged out successfully!" ,
            });
    }
);

export default router;
