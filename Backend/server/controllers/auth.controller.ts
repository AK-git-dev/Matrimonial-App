import {Router} from "express";
import {Schema} from "../../database/schema";
import {CreateProfileInterface , SignupInterface} from "../models";
import {
    checkEmailOrPhoneNumberAlreadyExists ,
    createError ,
    generateAuthToken ,
    generateMagicToken ,
    Next ,
    RequestInterface ,
    ResponseInterface ,
    setAuthorizationHeader ,
    SUCCESS ,
} from "../utils";
import {requiresMinimumAge} from "../utils/middlewares/age-restrictor.middleware";
import {requiresOtpVerification} from "../utils/middlewares/otp-verify.middleware";
import {requiresAuth} from "../utils/middlewares/requires-auth.middleware";

const router = Router ();

// [POST] : When User is going to create account for the first time.
router.post (
    "/signup" ,
    async (req: RequestInterface , res: ResponseInterface , next: Next) => {
        try {
            const payload: SignupInterface = req.body as SignupInterface;
            // If User already have verified account
            const isUserVerified = await Schema.User.findOne ({
                where :{phoneNumber :payload.phoneNumber} ,
            });
            if (isUserVerified)
                throw new createError.Conflict (
                    `you already have an account! Please log into your account`
                );

            const status = await checkEmailOrPhoneNumberAlreadyExists (res , payload);

            if (status === undefined) {
                // delete from preflight accounts
                await Schema.Prefight.destroy ({where :{phoneNumber :payload.phoneNumber}});
                const resp = await Schema.Prefight.create (payload);
                const magicToken = generateMagicToken (resp);

                return res.status (200).send ({
                    ...SUCCESS ,
                    otpCode :resp.getDataValue ("otpCode") ,
                    message :"Please verify with the OTP code already sent!" ,
                    magicToken ,
                    otpValidity :"1 min" ,
                });
            }
        } catch (error) {
            next (error);
        }
    }
);

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
            });
        } catch (e) {
            next (e);
        }
    }
);

// [POST]: Create Profile after Signup with Other cripsy necessary info
router.patch (
    "/create-profile/info" ,
    requiresAuth ,
    requiresMinimumAge ,
    async (req: RequestInterface , res: ResponseInterface , next: Next) => {
        try {
            const UserId = (req as any).userId;
            const payload: CreateProfileInterface = req.body as CreateProfileInterface;
            const ageNow =
                +new Date ().getUTCFullYear () -
                new Date (payload.dateOfBirth).getUTCFullYear ();
            const updatedPayloadWithAge = {...payload , age :ageNow};

            // Update Profile Info from payload;
            await Schema.User.update (updatedPayloadWithAge , {where :{id :UserId}});

            // update address info if any
            if (payload.address) {
                const addressPayload = {...payload.address , UserId};
                await Schema.Address.create (addressPayload);
            }

            // update caste information if any
            if (payload.caste) {
                const castePayload = {...payload.caste , UserId};
                await Schema.Caste.create (castePayload);
            }

            // update lifestyle information if any
            if (payload.lifeStyle) {
                const lifestylePayload = {...payload.lifeStyle , UserId};
                await Schema.LifeStyle.create (lifestylePayload);
            }

            if (payload.educations) {
                new Promise (async (resolve , reject) => {
                    try {
                        for (const education of payload.educations) {
                            const educationPayload = {...education , UserId};
                            await Schema.Education.create (educationPayload);
                        }
                        resolve (true);
                    } catch (e) {
                        reject (e);
                        next (e);
                    }
                })
            }

            return res.status (200).send ({
                ...SUCCESS ,
                message :'user profile information has been updated!'
            });
        } catch (error) {
            next (error);
        }
    }
);

export default router;
