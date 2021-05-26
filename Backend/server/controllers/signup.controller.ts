import {Router} from "express";
import {
    createError ,
    generateAuthToken ,
    generateOtpAndTokenHash ,
    Next ,
    RequestInterface ,
    ResponseInterface ,
    setAuthorizationHeader ,
    SUCCESS ,
} from "../utils";
import {PhoneNumberSignupInterface} from "../models";
import {Schema} from "../../database/schema";
import {requiresOtpVerification} from "../utils/middlewares/otp-verify.middleware";

const router = Router ();

// [POST] : When User is going to create account for the first time USING TWILIO CRED
router.post (
    "/" ,
    async (req: RequestInterface , res: ResponseInterface , next: Next) => {
        try {
            const payload: PhoneNumberSignupInterface = req.body as PhoneNumberSignupInterface;
            // If User already have verified account
            const isUserVerified = await Schema.User.findOne ({
                where :{phoneNumber :payload.phoneNumber} ,
            });
            if (isUserVerified)
                throw new createError.Conflict (
                    `you already have an account! Please log into your account`
                );

            // const status = await checkEmailOrPhoneNumberAlreadyExists(res, payload);

            // if (status === undefined) {
            //   // delete from preflight accounts
            //   await Schema.Prefight.destroy({
            //     where: { phoneNumber: payload.phoneNumber },
            //   });
            //   const resp = await Schema.Prefight.create(payload);
            //   const magicToken = generateMagicToken(resp);

            const ifTokenGenerated = await generateOtpAndTokenHash (payload.phoneNumber);
            if (typeof (ifTokenGenerated) === 'undefined') throw new createError.RequestTimeout (`Secure OTP could not be generated! Check your network connection`);

            return res.status (200).send ({
                ...SUCCESS ,
                otpCode :ifTokenGenerated.otp ,
                message :`Your one time password for Matrimony-Match ${ifTokenGenerated.otp}. OTP valid for only 2 minutes!` ,
                hash :ifTokenGenerated.fullHash ,
                otpValidity :"2 minutes" ,
            });
        } catch
            (error) {
            next (error);
        }
    }
)


// // [POST] : When User is going to create account for the first time. NOT SELF MADE
// router.post(
//   "/",
//   async (req: RequestInterface, res: ResponseInterface, next: Next) => {
//     try {
//       const payload: SignupInterface = req.body as SignupInterface;
//       // If User already have verified account
//       const isUserVerified = await Schema.User.findOne({
//         where: { phoneNumber: payload.phoneNumber },
//       });
//       if (isUserVerified)
//         throw new createError.Conflict(
//           `you already have an account! Please log into your account`
//         );
//
//       const status = await checkEmailOrPhoneNumberAlreadyExists(res, payload);
//
//       if (status === undefined) {
//         // delete from preflight accounts
//         await Schema.Prefight.destroy({
//           where: { phoneNumber: payload.phoneNumber },
//         });
//         const resp = await Schema.Prefight.create(payload);
//         const magicToken = generateMagicToken(resp);
//
//         return res.status(200).send({
//           ...SUCCESS,
//           otpCode: resp.getDataValue("otpCode"),
//           message: "Please verify with the OTP code already sent!",
//           magicToken,
//           otpValidity: "1 min",
//         });
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// [POST] : Verify user account using OTP CODE generated
router.post (
    "/account/verify/otp" ,
    requiresOtpVerification ,
    async (req: RequestInterface , res: ResponseInterface , next: Next) => {
        try {
            const {userId , email , password , phoneNumber} = req as any;
            // OTP has been verified &&
            // send the ACK to the client to proceed with profile building part

            const payload = {id :userId , email , password , phoneNumber};
            const resp = await Schema.User.create (payload);
            const token: string = generateAuthToken (resp);
            setAuthorizationHeader (res , token);

            return res.status (200).send ({
                ...SUCCESS ,
                token ,
                userId :userId ,
                email ,
                isLoggedIn :true ,
            });
        } catch (e) {
            next (e);
        }
    }
);

export default router;
