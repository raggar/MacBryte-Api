import { Router } from "express";
import controllers from "./controllers";

const router = Router();

router.post("/signup", controllers.signup);
router.post("/login", controllers.login);

export default router;
