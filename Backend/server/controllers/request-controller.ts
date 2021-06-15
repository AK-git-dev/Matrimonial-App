import {Router} from "express";
import {createError , Next , RequestInterface , ResponseInterface , SUCCESS} from "../utils";
import {requiresAuth} from "../utils/middlewares/requires-auth.middleware";
import {Schema} from "../../database/schema";
import {Model} from "sequelize";

const router = Router ();

// [GET]: Sending Request to the User
router.get ('/send/:sendPersonId' , requiresAuth , async (req: RequestInterface , res: ResponseInterface , next: Next) => {
    try {
        const UserId: string = (req as any).userId;
        const sendPersonId: string = req.params.sendPersonId;

        await Schema.RequestSend.findOrCreate ({
            where :{
                sendPersonId ,
                UserId
            }
        });

        return res.status (202).send ({
            ...SUCCESS ,
            message :'Request has been sent successfully!'
        });

    } catch (e) {
        next (e);
    }
});

// [POST]: Remove send request from the person!
router.post ('/remove/request/:sendPersonUUID' , requiresAuth , async (req: RequestInterface , res: ResponseInterface , next: Next) => {
    try {
        const sendPersonUUID: string = req.params.sendPersonUUID; // <Primary Key>
        await Schema.RequestSend.destroy ({where :{id :sendPersonUUID}});

        return res.status (202).send ({
            ...SUCCESS ,
            message :"Request has been removed successfully!"
        });

    } catch (e) {
        next (e);
    }
});

// [GET]: Showing Pending requests
router.get ('/pending/all' , requiresAuth , async (req: RequestInterface , res: ResponseInterface , next: Next) => {
    try {
        const UserId = (req as any).userId;

        const pendingRequests: Model<any , any>[] = await Schema.RequestSend.findAll ({
            where :{UserId} ,
            include :[{model :Schema.User, attributes: ["fullname", "age"]}]
        });
        return res.status (202).send ({
            ...SUCCESS ,
            message :"All pending requests" ,
            pendingRequests ,
            count :pendingRequests.length
        })

    } catch (e) {
        next (e);
    }
});


export default router;
