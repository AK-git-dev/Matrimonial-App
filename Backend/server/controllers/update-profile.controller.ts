import {Router} from "express";
import {requiresAuth} from "../utils/middlewares/requires-auth.middleware";
import {requiresMinimumAge} from "../utils/middlewares/age-restrictor.middleware";
import {createError , Next , RequestInterface , ResponseInterface , SUCCESS ,} from "../utils";
import {
    AddressInterface ,
    CasteInterface ,
    CreateProfileInterface ,
    EducationInterface ,
    LifestyleInterface ,
} from "../models";
import {Schema} from "../../database/schema";

const router = Router ();

// [PATCH]: Create Profile after Signup
router.patch (
    "/update-info" ,
    requiresAuth ,
    requiresMinimumAge ,
    async (req: RequestInterface , res: ResponseInterface , next: Next) => {
        try {
            const userId = (req as any).userId;
            const phoneNumber = (req as any).phoneNumber;

            const payload: CreateProfileInterface = req.body as CreateProfileInterface;
            const ageNow = (req as any).age;
            const updatedPayloadWithAge = {...payload , age :ageNow};

            // Update Profile Info from payload;
            const saved = await Schema.User.update (updatedPayloadWithAge , {
                where :{id :userId , phoneNumber} ,
            });

            return res.status (200).send ({
                ...SUCCESS ,
                message :"user profile information has been updated!" ,
            });
        } catch (error) {
            next (error);
        }
    }
);

// [POST]: Add Address information to the user
router.post (
    "/update-address" ,
    requiresAuth ,
    async (req: RequestInterface , res: ResponseInterface , next: Next) => {
        try {
            const UserId = (req as any).userId;
            const payload: AddressInterface = req.body as AddressInterface;

            // update address info if any
            if (payload) {

                const ifAddressExists = await Schema.Address.findOne ({where :{UserId}})
                if (ifAddressExists === null) {
                    // if not present then create
                    const addressPayload = {...payload , UserId};
                    await Schema.Address.create (addressPayload);
                } else {
                    // check if address exists then only updaten
                    await ifAddressExists.update ({...payload});
                    console.log (`Address has been updated`);
                }


                return res.status (200).send ({
                    ...SUCCESS ,
                    message :`user address has been added successfully!` ,
                });
            } else
                throw new createError.UnprocessableEntity (
                    `address is not correctly formatted`
                );
        } catch (e) {
            next (e);
        }
    }
);

// [POST]: Add Caste information to the user
router.post (
    "/update-caste" ,
    requiresAuth ,
    async (req: RequestInterface , res: ResponseInterface , next: Next) => {
        try {
            const UserId = (req as any).userId;
            const payload: CasteInterface = req.body as CasteInterface;

            // update address info if any
            // update caste information if any
            if (payload) {
                const castePayload = {...payload , UserId};
                await Schema.Caste.create (castePayload);

                return res.status (200).send ({
                    ...SUCCESS ,
                    message :`user caste has been added successfully!` ,
                });
            } else
                throw new createError.UnprocessableEntity (
                    `caste is not correctly formatted`
                );
        } catch (e) {
            next (e);
        }
    }
);

// [POST]: Add life style information to the user
router.post (
    "/update-lifestyle" ,
    requiresAuth ,
    async (req: RequestInterface , res: ResponseInterface , next: Next) => {
        try {
            const UserId = (req as any).userId;
            const payload: LifestyleInterface = req.body as LifestyleInterface;

            // update lifestyle information if any
            if (payload) {
                const lifestylePayload = {...payload , UserId};
                await Schema.LifeStyle.create (lifestylePayload);

                return res.status (200).send ({
                    ...SUCCESS ,
                    message :`user lifestyle has been added successfully!` ,
                });
            } else
                throw new createError.UnprocessableEntity (
                    `lifestyle information is not correctly formatted`
                );
        } catch (e) {
            next (e);
        }
    }
);

// [POST] : Add Educational Qualification to the user
router.post (
    "/update-educations" ,
    requiresAuth ,
    async (req: RequestInterface , res: ResponseInterface , next: Next) => {
        try {
            const UserId = (req as any).userId;
            const payload: EducationInterface[] = req.body as EducationInterface[];
            console.log (payload);
            if (payload) {
                for (const education of payload) {
                    const educationPayload = {...education , UserId};
                    await Schema.Education.create (educationPayload);
                }

                return res.status (200).send ({
                    ...SUCCESS ,
                    message :"user education details has been successfully added!" ,
                });
            } else
                throw new createError.UnprocessableEntity (
                    "user educations are not correctly formatted!"
                );
        } catch (e) {
            next (e);
        }
    }
);

export default router;
