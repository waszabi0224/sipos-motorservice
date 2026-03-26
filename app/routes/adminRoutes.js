import express from "express";
import { isAdmin } from "../middlewares/authMiddleware.js";
import { showAdminPage, showUserPage, showUserPageById, showServicesPage, createAService, updateAService, deleteAService } from "../controllers/adminController.js";

const router = express.Router();

router.get("/", isAdmin, showAdminPage);
router.get("/users", isAdmin, showUserPage);
router.get("/users/:id", isAdmin, showUserPageById);
router.get("/services", isAdmin, showServicesPage);
router.post("/services", isAdmin, createAService);
router.patch("/services/:id", isAdmin, updateAService);
router.delete("/services/:id", isAdmin, deleteAService);

export default router;
