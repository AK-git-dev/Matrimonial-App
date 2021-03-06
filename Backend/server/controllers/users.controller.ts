import { Router } from "express";
import { Next, RequestInterface, ResponseInterface, SUCCESS } from "../utils";
import { getAllUsersWithAllDetails } from "../utils/db-query";

const router = Router();

// [GET] All the Users and every details [DEV ONLY]
router.get(
  "/",
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      // await fakeUsersDataGenerator(1000);
      // await fakeDataGenerator();

      const allUsers = await getAllUsersWithAllDetails();
      return res.status(200).send({ ...SUCCESS, allUsers });
    } catch (error) {
      return next(error);
    }
  }
);

export default router;
