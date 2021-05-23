import { Router, static as st } from "express";
import createHttpError from "http-errors";
import { SUCCESS, Request, Response, Next } from "../utils";
import { getAllUsersWithAllDetails } from "../utils/db-query";

const router = Router();

router.get("/data", async (req: Request, res: Response, next: Next) => {
  try {
    const allUsers = await getAllUsersWithAllDetails();

    res.status(200).send({
      ...SUCCESS,
      msg: "server is running",
      ip: req.ip,
      allUsers,
      timestamp: Date.now(),
    });
  } catch (error) {
    next(createHttpError.InternalServerError);
  }
  next();
});

// Controllers

export default router;
