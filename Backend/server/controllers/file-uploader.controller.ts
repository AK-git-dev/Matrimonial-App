import { Router } from "express";
import ProfilePictureUploadService from "./microservices/profile-picture.service";

const router = Router();

router.use("/profile-pictures", ProfilePictureUploadService);

export default router;
