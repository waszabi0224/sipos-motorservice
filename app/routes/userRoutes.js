import express from "express";
import { showRegisterPage, registerUser, showloginPage, loginUser, logoutUser, showProfilePage } from "../controllers/userController.js";
import { showAppointmentServicePage } from "../controllers/serviceController.js";
import { selectService, showTimePage, selectTime, showDatasPage, upDatasAndSave } from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/register", showRegisterPage);
router.post("/register", registerUser);

router.get("/login", showloginPage);
router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/profile", showProfilePage);

router.get("/appointment/services", showAppointmentServicePage);
router.post("/appointment/service", selectService);
router.get("/appointment/time", showTimePage);
router.post("/appointment/time", selectTime);
router.get("/appointment/data", showDatasPage);
router.post("/appointment/data", upDatasAndSave);

export default router;
