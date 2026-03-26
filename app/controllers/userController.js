import { findUserByEmail, createUser } from "../models/userModel.js";
import bcrypt from "bcrypt";

const showRegisterPage = (req, res) => {
    res.render("register", {
        error: null
    });
};

const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, phone } = req.body;

        if(!first_name || !last_name || !email || !password || !phone) {
            return res.status(400).render("register", {
                error: "Minden mező kitöltése kötelező!"
            });
        }

        const pwd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,24}$/;
        if(!pwd_regex.test(password)) {
            return res.status(400).render("register", {
                error: "A jelszónak tartalmaznia kell legalább 8, de maximum 24 karaktert, valamint egy kisbetűt, egy nagybetűt és egy speciális karaktert!"
            });
        }

        const existingUser = await findUserByEmail(email);
        if(existingUser) {
            return res.status(409).render("register", {
                error: "Ez az email cím már létezik!"
            });
        }

        const hashPassword = bcrypt.hashSync(password, 12);

        const user = await createUser({ first_name, last_name, email, password: hashPassword, phone });

        return res.redirect("/auth/login");
    } catch(error) {
        return res.status(500).render("register", {
            error: "Hiba történt a regisztráció során!"
        });
    }
};

const showloginPage = (req, res) => {
    res.render("login", {
        error: null
    });
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).render("login", {
                error: "Minden mező kitöltése kötelező!"
            });
        }

        const existingUser = await findUserByEmail(email);

        if(!existingUser) {
            return res.status(404).render("login", {
                error: "Nincs ilyen felhasználó!"
            });
        }

        const validPassword = bcrypt.compare(password, existingUser.password);
        if(!validPassword) {
            return res.status(403).render("login", {
                error: "Hibás email cím vagy jelszó!"
            });
        }

        req.session.user = {
            id: existingUser.id,
            first_name: existingUser.first_name,
            last_name: existingUser.last_name,
            email: existingUser.email,
            role: existingUser.role,
            phone: existingUser.phone,
            created_at: existingUser.created_at
        };

        if(existingUser.role === "admin") {
            return res.redirect("/admin");
        }
        return res.redirect("/");
    } catch(error) {
        return res.status(500).render("login", {
            error: "Hiba történt a bejelentkezés során!"
        })
    }
};

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return res.status(500).render("home", {
                error: "Hiba történt a kijelentkezés során!"
            });
        }
    });
    console.log(req.session);
    res.redirect("/");
};

const showProfilePage = (req, res) => {
    if(!req.session.user) {
        return res.redirect("/auth/login");
    }
    res.render("profile", {
        user: req.session.user,
        error: null
    });
}

export {
    showRegisterPage,
    registerUser,
    showloginPage,
    loginUser,
    logoutUser,
    showProfilePage
};
