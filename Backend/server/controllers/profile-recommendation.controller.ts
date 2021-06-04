import { Router } from "express";
import { Next, RequestInterface, ResponseInterface, SUCCESS } from "../utils";
import { requiresAuth } from "../utils/middlewares/requires-auth.middleware";
import { generateProfileRecommendationsList } from "../utils/db-query";

const router = Router();

// [GET]: Recommendation to the user to other profiles

router.get(
  "/",
  requiresAuth,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const UserId: string = (req as any).userId;
      const recommendedProfiles = await generateProfileRecommendationsList(
        UserId
      );

      return res.status(202).send({
        ...SUCCESS,
        recommendedProfiles,
        message: "all recommended profiles list",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
