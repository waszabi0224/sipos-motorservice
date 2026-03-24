import express from "express"; 
import { showHomePage, showContactPage, showServicePage, showProfilePage } from "../controllers/publicController.js";

const router = express.Router();

router.get("/", showHomePage);
router.get("/contact", showContactPage);
router.get("/services", showServicePage);
router.get("/profile", showProfilePage);

export default router;
