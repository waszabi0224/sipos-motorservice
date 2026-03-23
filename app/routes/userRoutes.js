import express from "express";
import { showRegisterPage, registerUser, showloginPage, loginUser, logoutUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/register", showRegisterPage);
router.post("/register", registerUser);

router.get("/login", showloginPage);
router.post("/login", loginUser);

router.post("/logout", logoutUser);

export default router;
