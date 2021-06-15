import {Router} from "express";
import {Next , RequestInterface , ResponseInterface , SUCCESS} from "../utils";
import {requiresAuth} from "../utils/middlewares/requires-auth.middleware";
import {Schema} from "../../database/schema";
import {Model , Op} from "sequelize";

const router = Router ();

function getDateWithAgo(day: number) {
    const now: Date = new Date();
    const ago: Date = new Date (new Date().setDate (new Date().getDate () - day)); // `day` days ago
    return {now , ago};
}

router.get ('/' , requiresAuth , async (req: RequestInterface , res: ResponseInterface , next: Next) => {
    try {

        // 3 days span
        let {now , ago} = getDateWithAgo (3);
        const profiles: Model<any, any>[] = await Schema.User.findAll ({where :{createdAt :{[Op.between] :[ago , now]}}});

        return res.status (202).send ({
            ...SUCCESS ,
            message :`List of new joiners within 3 days ago!` ,
            profiles,
            count: profiles.length
        })

    } catch (e) {
        next (e);
    }
})


export default router;
