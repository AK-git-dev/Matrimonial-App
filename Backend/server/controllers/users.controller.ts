import {Router} from "express";
import {Next , RequestInterface , ResponseInterface , SUCCESS ,} from "../utils";
import {getAllUsersWithAllDetails} from "../utils/db-query";
import {Schema} from "../../database/schema";

const router = Router ();

// [GET] All the Users and every details [DEV ONLY]
router.get (
    "/" ,
    async (req: RequestInterface , res: ResponseInterface , next: Next) => {
        try {
            const allUsers = await getAllUsersWithAllDetails ();
            const allEducation = await Schema.Education.findAll();
            return res.status (200).send ({...SUCCESS , allUsers, allEducation});
        } catch (error) {
            return next (error);
        }
    }
);

export default router;
