import express from "express"; 
import { showHomePage, showContactPage } from "../controllers/publicController.js";
import { showServicePage, showServiceDetailsPage } from "../controllers/serviceController.js";

const router = express.Router();

router.get("/", showHomePage);
router.get("/contact", showContactPage);
router.get("/services", showServicePage);
router.get("/services/:id", showServiceDetailsPage);

export default router;
