import {JWT_ACCESS_SECRET , Next , RequestInterface , ResponseInterface ,} from "../index";
import createHttpError from "http-errors";
import {verify} from "jsonwebtoken";
import {TokenInterface} from "../../models";
import {Schema} from "../../../database/schema";

async function verifyAuthTokenValidity(token: string): Promise<TokenInterface> {
    return verify (token , JWT_ACCESS_SECRET) as TokenInterface;
}

export async function requiresAuth(
    req: RequestInterface ,
    res: ResponseInterface ,
    next: Next
) {
    try {
        // check for accessToken present on cookie or not
        const accessToken = req.cookies.accessToken;
        if (!accessToken) throw new createHttpError.BadRequest (`Access token not found! May be you're logged out!`);

        const verifiedToken: TokenInterface = await verifyAuthTokenValidity (accessToken);
        if (!verifiedToken.userId || !verifiedToken.phoneNumber) throw new createHttpError.Forbidden ('Access Token expired and logged out! Please Login again');


        // check if user exists in database
        const userExists = await Schema.User.findByPk (verifiedToken.userId);
        if (userExists === null)
            throw createHttpError (401 , "user is not registered!!");

        // propagate to the next controller action
        (req as any).userId = verifiedToken.userId;
        (req as any).phoneNumber = verifiedToken.phoneNumber;

        next ();
    } catch (e) {
        next (e);
    }
}
