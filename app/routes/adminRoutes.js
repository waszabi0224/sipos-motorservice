import express from "express";
import isAdmin from "../middlewares/authMiddleware.js";
import { showAdminPage, showUserPage, showUserPageById } from "../controllers/adminController.js";

const router = express.Router();

router.get("/", isAdmin, showAdminPage);
router.get("/users", isAdmin, showUserPage);
router.get("/users/:id", isAdmin, showUserPageById);

export default router;
