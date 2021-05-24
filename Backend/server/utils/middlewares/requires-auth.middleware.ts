import {Next , RequestInterface , ResponseInterface , SECRET} from "../index";
import createHttpError from "http-errors";
import {verify} from "jsonwebtoken";
import {TokenInterface} from "../../models";
import {Schema} from "../../../database/schema";


async function verifyAuthTokenValidity(token: string): Promise<TokenInterface> {
    return (verify (token , SECRET)) as TokenInterface
}

export async function requiresAuth(req: RequestInterface , res: ResponseInterface , next: Next) {
    try {
        // check for authorized token present on header or not
        const authorizedToken: string | undefined = req.headers.authorization;
        if (authorizedToken === undefined) throw new createHttpError.Unauthorized (`Sorry! You are not authorized`);

        const extractedToken: string = authorizedToken.split (' ')[1];
        // check for its validity
        const {userId}: TokenInterface = await verifyAuthTokenValidity (extractedToken);

        // check if user exists in database
        const userExists = await Schema.User.findByPk (userId);
        if (userExists === null)
            throw createHttpError (401 , 'user is not registered!!');

        // propagate to the next controller action
        (req as any).userId = userId;
        next ();

    } catch (e) {
        next (e);
    }
}
