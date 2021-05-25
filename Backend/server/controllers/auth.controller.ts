import { Router } from "express";

import SignupController from "./signup.controller";
import LoginController from "./login.controller";

const router = Router();

router.use("/signup", SignupController);
router.use("/login", LoginController);

export default router;
