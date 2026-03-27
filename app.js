import express from "express";
import userRoutes from "./app/routes/userRoutes.js";
import publicRoutes from "./app/routes/publicRoutes.js";
import adminRoutes from "./app/routes/adminRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import methodOverride from "method-override";
import { getActiveServices } from "./app/models/serviceModel.js";
import { getAppointmentsByUserId } from "./app/models/appointmentModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(methodOverride("_method"));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app", "views"));
app.use(express.static(path.join(__dirname, "app", "public")));

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "titkos-kulcs",
    resave: "false",
    saveUninitialized: "false"
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.use(async (req, res, next) => {
    res.locals.active_services = await getActiveServices();
    next();
});

app.use(async (req, res, next) => {
    try {
        if(req.session.user) {
            res.locals.appointments = await getAppointmentsByUserId(req.session.user.id);
        } else {
            res.locals.appointments = [];
        }

        next();
    } catch(error) {
        next(error);
    }
    
});

app.use("/auth", userRoutes);
app.use("/", publicRoutes);
app.use("/admin", adminRoutes);

export default app;