import { Router } from "express";
import controllers from "./controllers";

const router = Router();

router.get("/userInfo", controllers.getUserInformation);
router.get("/getAll", controllers.getAllUsers);

router.post("/signup", controllers.signup);
router.post("/login", controllers.login);
router.post("/updateUsers", controllers.updateUsers);

export default router;
