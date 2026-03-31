import express from "express";
import { showRegisterPage, registerUser, showloginPage, loginUser, logoutUser, showProfilePage } from "../controllers/userController.js";
import { showAppointmentServicePage } from "../controllers/serviceController.js";
import { selectService, showTimePage, selectTime, showDatasPage, upDatasAndSave } from "../controllers/appointmentController.js";
import { createABike, deleteABike, updateABike } from "../controllers/bikeController.js";
import { showBrandsBySelection, showModelsBySelection, showCylindersBySelection, showStrokesBySelection, showGenerationsBySelection, showCatalogBySelection, showCatalogById } from "../controllers/catalogController.js";

const router = express.Router();

router.get("/register", showRegisterPage);
router.post("/register", registerUser);

router.get("/login", showloginPage);
router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/profile", showProfilePage);

router.post("/bikes", createABike);
router.patch("/bikes/:id", updateABike);
router.delete("/bikes/:id", deleteABike);

router.get("/appointment/services", showAppointmentServicePage);
router.post("/appointment/service", selectService);
router.get("/appointment/time", showTimePage);
router.post("/appointment/time", selectTime);
router.get("/appointment/data", showDatasPage);
router.post("/appointment/data", upDatasAndSave);

router.get("/catalog/brands/:category", showBrandsBySelection);
router.get("/catalog/models/:category/:brand", showModelsBySelection);
router.get("/catalog/cylinders/:category/:brand/:model", showCylindersBySelection);
router.get("/catalog/strokes/:category/:brand/:model/:cylinder", showStrokesBySelection);
router.get("/catalog/generations/:category/:brand/:model/:cylinder/:stroke", showGenerationsBySelection);
router.post("/catalog/selection", showCatalogBySelection);
router.get("/catalog/:id", showCatalogById);

export default router;
