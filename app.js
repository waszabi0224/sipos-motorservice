import express from "express";
import userRoutes from "./app/routes/userRoutes.js";
import homeRoutes from "./app/routes/homeRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app", "views"));

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

app.use("/auth", userRoutes);
app.use("/", homeRoutes);

export default app;