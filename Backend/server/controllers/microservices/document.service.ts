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

async function handleFileUpload(
  fileType: string,
  req: RequestInterface,
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
      { [fileType]: savePath },
      { where: { UserId } }
    );
    return next();
  } catch (error) {
    next(error);
  }
}

// [POST]: Aadhar Card Upload
router.post(
  "/upload-aadhar",
  requiresAuth,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      await handleFileUpload("aadharCard", req, next).catch(
        () =>
          new createError.Forbidden(
            "Aadhar card uploading failed! Please try again!"
          )
      );

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
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      await handleFileUpload("drivingLicense", req, next).catch(
        () =>
          new createError.Forbidden(
            "Driving License uploading failed! Please try again!"
          )
      );

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
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      await handleFileUpload("passport", req, next).catch(
        () =>
          new createError.Forbidden(
            "Passport uploading failed! Please try again!"
          )
      );

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
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      await handleFileUpload("voterCard", req, next).catch(
        () =>
          new createError.Forbidden(
            "Voter Card uploading failed! Please try again!"
          )
      );

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
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      await handleFileUpload("panCard", req, next).catch(
        () =>
          new createError.Forbidden(
            "Pan Card uploading failed! Please try again!"
          )
      );

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
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      await handleFileUpload("graduateCertificate", req, next).catch(
        () =>
          new createError.Forbidden(
            "Graduation Certificate uploading failed! Please try again!"
          )
      );

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
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      await handleFileUpload("higherSecondaryCertificate", req, next).catch(
        () =>
          new createError.Forbidden(
            "HS Certificate uploading failed! Please try again!"
          )
      );

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
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      await handleFileUpload("secondaryCertificate", req, next).catch(
        () =>
          new createError.Forbidden(
            "Secondary Certificate uploading failed! Please try again!"
          )
      );

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
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      await handleFileUpload("diplomaCertificate", req, next).catch(
        () =>
          new createError.Forbidden(
            "Diploma Certificate uploading failed! Please try again!"
          )
      );

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
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      await handleFileUpload("appointmentLetter", req, next).catch(
        () =>
          new createError.Forbidden(
            "Appointment Letter uploading failed! Please try again!"
          )
      );

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
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      await handleFileUpload("tradeLicense", req, next).catch(
        () =>
          new createError.Forbidden(
            "Trade License uploading failed! Please try again!"
          )
      );

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
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      await handleFileUpload("taxation", req, next).catch(
        () =>
          new createError.Forbidden(
            "Taxation uploading failed! Please try again!"
          )
      );

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
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      await handleFileUpload("shopAggrement", req, next).catch(
        () =>
          new createError.Forbidden(
            "Shop Aggrement uploading failed! Please try again!"
          )
      );

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
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      await handleFileUpload("bankPassbook", req, next).catch(
        () =>
          new createError.Forbidden(
            "Bank Passbook uploading failed! Please try again!"
          )
      );

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
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      await handleFileUpload("salarySlip", req, next).catch(
        () =>
          new createError.Forbidden(
            "Salary Slip uploading failed! Please try again!"
          )
      );

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
