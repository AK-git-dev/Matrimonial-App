import { Router } from "express";
import ProfilePictureUploadService from "./microservices/profile-picture.service";
import DocumentsUploaderService from "./microservices/document.service";

const router = Router();

router.use("/profile-pictures", ProfilePictureUploadService);
router.use("/documents-uploader", DocumentsUploaderService);

export default router;
