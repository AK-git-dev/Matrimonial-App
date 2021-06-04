import { Router, static as st } from "express";
import createHttpError from "http-errors";
import {
  FileUploadFolderStaticServe,
  Next,
  RequestInterface,
  ResponseInterface,
  SUCCESS,
} from "../utils";
import AuthController from "./auth.controller";
import UserController from "./users.controller";
import CreateProfileController from "./update-profile.controller";
import FileUploaderController from "./file-uploader.controller";
import ProfileRecommendationController from "./profile-recommendation.controller";

const router = Router();

router.use(
  st(FileUploadFolderStaticServe, {
    cacheControl: true,
    immutable: true,
    fallthrough: true,
  })
);

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
router.use("/profile", CreateProfileController);
router.use("/profiles-recommendations", ProfileRecommendationController);
router.use("/users", UserController);
router.use("/upload-service", FileUploaderController);

export default router;
