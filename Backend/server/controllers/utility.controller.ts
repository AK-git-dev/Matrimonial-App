import { Router } from "express";
import { Schema } from "../../database/schema";
import { Feeder } from "../seeders/data-objects";
import { Next, RequestInterface, ResponseInterface, SUCCESS } from "../utils";

const router = Router();

// [GET]: ALL Available Languages List
router.get(
  "/languages",
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res.status(202).send({
        ...SUCCESS,
        message: "All avaible languages lists",
        allLanguages: Feeder.Languages,
      });
    } catch (error) {
      next(error);
    }
  }
);

// [GET]: ALL Available Castes - Subcastes
router.get(
  "/castes-subcastes",
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const casteSubcastes = await Schema.Caste.findAll({
        attributes: ["id", "caste", "subCaste"],
      });

      return res.status(202).send({
        ...SUCCESS,
        message: "All available lists of caste-subcasts!",
        allCastesWithSubcastes: casteSubcastes,
      });
    } catch (error) {
      next(error);
    }
  }
);

// [GET]: ALL available Lists of Educations + Types
router.get(
  "/education-types",
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res.status(200).send({
        ...SUCCESS,
        message: "All available lists of educations and types",
        educationWithTypes: Feeder.Education,
      });
    } catch (error) {
      next(error);
    }
  }
);

// [GET]: ALL available Lists of Occupations + Positions
router.get(
  "/ocupations-positions",
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res.status(200).send({
        ...SUCCESS,
        message: "All available lists of occupations and positions",
        educationWithTypes: Feeder.Occupations,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

function buildCasteSubCasteLists() {
  const casteSubcastes: { type: string }[] = [];
  Feeder.Castes.forEach((cas) => {
    if (cas.subCaste.length > 0) {
      cas.subCaste.forEach((c) => {
        casteSubcastes.push({
          type: `${cas.caste}-${c}`,
        });
      });
    } else {
      casteSubcastes.push({
        type: `${cas.caste}-`,
      });
    }
  });

  return casteSubcastes;
}
