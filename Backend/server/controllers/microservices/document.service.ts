import { Router } from "express";
import path from "path";
import { Schema } from "../../../database/schema";
import {
  createError,
  FileUploadDirectoryPath,
  FileUploadInterface,
  Next,
  RequestInterface,
  ResponseInterface,
  SUCCESS,
} from "../../utils";
import { requiresAuth } from "../../utils/middlewares/requires-auth.middleware";

const router = Router();

// * Utility Function to upload Files

function handleFileUpload(fileType: string) {
  return async function (
    req: RequestInterface,
    res: ResponseInterface,
    next: Next
  ) {
    try {
      // get the UserId first
      const UserId: string = (req as any).userId;

      // grab the file from req.files
      const file: FileUploadInterface = (req.files as any)
        .file as FileUploadInterface;

      const filename: string = `${file.md5}${path.extname(file.name)}`;
      const savePath: string = `${FileUploadDirectoryPath}/${filename}`;
      await file
        .mv(savePath)
        .catch(
          () =>
            new createError.Forbidden(
              "Something went wrong! File cannot be saved! Please try again!"
            )
        );

     await Schema.UploadedDocument.findOrCreate({ where: { UserId } });

      // update
      await Schema.UploadedDocument.update(
        { [fileType]: `uploads/${filename}` },
        { where: { UserId } }
      );

      next();
    } catch (error) {
      next(error);
    }
  };
}

// [POST]: Aadhar Card Upload
router.post(
  "/upload-aadhar",
  requiresAuth,
  handleFileUpload("aadharCard"),
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res.status(202).send({
        ...SUCCESS,
        message: "Aadhar card has been uploaded succesfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

// [POST]: Driving License Upload
router.post(
  "/upload-driving-license",
  requiresAuth,
  handleFileUpload("drivingLicense"),
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res.status(202).send({
        ...SUCCESS,
        message: "Driving License has been uploaded succesfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

// [POST]: Passport Upload
router.post(
  "/upload-passport",
  requiresAuth,
  handleFileUpload("passport"),
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res.status(202).send({
        ...SUCCESS,
        message: "Passport has been uploaded succesfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

// [POST]: Voter Card Upload
router.post(
  "/upload-voter-card",
  requiresAuth,
  handleFileUpload("voterCard"),
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res.status(202).send({
        ...SUCCESS,
        message: "Voter Card has been uploaded succesfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

// [POST]: Pan Card Upload
router.post(
  "/upload-pan-card",
  requiresAuth,
  handleFileUpload("panCard"),
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res.status(202).send({
        ...SUCCESS,
        message: "Pan Card has been uploaded succesfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

// [POST]: Graduation Certificate Upload
router.post(
  "/upload-graduate-certificate",
  requiresAuth,
  handleFileUpload("graduateCertificate"),
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res.status(202).send({
        ...SUCCESS,
        message: "Graduation Certificate has been uploaded succesfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

// [POST]: HS Certificate Upload
router.post(
  "/upload-hs-certificate",
  requiresAuth,
  handleFileUpload("higherSecondaryCertificate"),
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res.status(202).send({
        ...SUCCESS,
        message: "HS Certificate has been uploaded succesfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

// [POST]: Secondary Certificate Upload
router.post(
  "/upload-secondary-certificate",
  requiresAuth,
  handleFileUpload("secondaryCertificate"),
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res.status(202).send({
        ...SUCCESS,
        message: "Secondary Certificate has been uploaded succesfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

// [POST]: Diploma Certificate Upload
router.post(
  "/upload-diplome-certificate",
  requiresAuth,
  handleFileUpload("diplomaCertificate"),
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res.status(202).send({
        ...SUCCESS,
        message: "Diploma Certificate has been uploaded succesfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

// [POST]: Appointment Letter Upload
router.post(
  "/upload-appointment-letter",
  requiresAuth,
  handleFileUpload("appointmentLetter"),
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res.status(202).send({
        ...SUCCESS,
        message: "Appointment Letter has been uploaded succesfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

// [POST]: Trade License Upload
router.post(
  "/upload-trade-license",
  requiresAuth,
  handleFileUpload("tradeLicense"),
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res.status(202).send({
        ...SUCCESS,
        message: "Trade License has been uploaded succesfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

// [POST]: Taxation Upload
router.post(
  "/upload-taxation",
  requiresAuth,
  handleFileUpload("taxation"),
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res.status(202).send({
        ...SUCCESS,
        message: "Taxation has been uploaded succesfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

// [POST]: Shop Aggrement Upload
router.post(
  "/upload-shop-aggrement",
  requiresAuth,
  handleFileUpload("shopAggrement"),
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res.status(202).send({
        ...SUCCESS,
        message: "Shop Aggrement has been uploaded succesfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

// [POST]: Bank Passbook Upload
router.post(
  "/upload-bank-passbook",
  requiresAuth,
  handleFileUpload("bankPassbook"),
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res.status(202).send({
        ...SUCCESS,
        message: "Bank Passbook has been uploaded succesfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

// [POST]: Salary Slip Upload
router.post(
  "/upload-salary-slip",
  requiresAuth,
  handleFileUpload("salarySlip"),
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res.status(202).send({
        ...SUCCESS,
        message: "Salary Slip has been uploaded succesfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
