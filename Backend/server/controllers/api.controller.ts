import { Router } from "express";
import createHttpError from "http-errors";
import { Next, RequestInterface, ResponseInterface, SUCCESS } from "../utils";
import AuthController from "./auth.controller";
import UserController from "./users.controller";
import CreateProfileController from "./create-profile.controller";

const router = Router();

router.get(
  "/data",
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      res.status(200).send({
        ...SUCCESS,
        msg: "server is running",
        ip: req.ip,
        timestamp: Date.now(),
      });
    } catch (error) {
      next(new createHttpError.InternalServerError(`Something went bad!`));
    }
    next();
  }
);

// Controllers
router.use("/auth", AuthController);
router.use("/create-profile", CreateProfileController);
router.use("/users", UserController);

export default router;
