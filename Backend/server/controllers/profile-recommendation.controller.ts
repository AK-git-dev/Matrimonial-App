import { Router } from "express";
import { Next, RequestInterface, ResponseInterface, SUCCESS } from "../utils";
import { requiresAuth } from "../utils/middlewares/requires-auth.middleware";

const router = Router();

// [GET]: Recommendation to the user to other profiles

router.get('/', requiresAuth ,async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
        


        return res.status(202).send({
            ...SUCCESS,
            message: 'all recommended profiles list'
        })
    } catch (error) {
        next(error);
    }
})


export default router;