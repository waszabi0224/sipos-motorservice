import { getUserById, getAllUsers } from "../models/userModel.js";
import { getAllServices, createService, updateService, deleteService } from "../models/serviceModel.js";

const showAdminPage = (req, res) => {
    res.render("admin/adminHome", {
        error: null
    });
}

const showUserPage = async (req, res, next) => {
    if(req.session.user.role === "admin") {
        try {
            const users = await getAllUsers();

            return res.render("admin/users", {
                users
            });
        } catch(error) {
            return res.status(500).render("admin/users", {
                error: "Hiba történt a felhasználók lekérése során!",
            })
        }
    } else {
        return res.status(403).send("Nincs jogosultságod megtekinteni ezt az oldalt!");
    }
}

const showUserPageById = async (req, res, next) => {
    if(req.session.user.role === "admin") {
        try {
            const { id } = req.params;
            const selectedUser = await getUserById(id);

            if(!selectedUser) {
                return res.status(404).send("A felhasználó nem található!");
            }

            return res.render("admin/userPage", {
                selectedUser
            });
        } catch(error) {
            return res.status(500).send("Hiba történt a felhasználó lekérése során!");
        }
    } else {
        return res.status(403).send("Nincs jogosultságod megtekinteni ezt az oldalt!");
    }
}

const createAService = async (req, res, next) => {
    if(req.session.user.role === "admin") {
        try {
            const { name, description, price, duration, is_active } = req.body;

            if(!name || !description || !price || !duration || !is_active) {
                return res.status(400).render("admin/services", {
                    error: "Minden mező kitöltése kötelező!"
                });
            }

            const service = await createService({ name, description, price, duration, is_active });

            return res.redirect("/admin/services");
        } catch(error) {
            return res.status(500).send("Hiba történt a szolgáltatás létrehozása során!");
        }
    } else {
        return res.status(403).send("Nincs jogosultságod megtekinteni ezt az oldalt!");
    }
}

const updateAService = async (req, res, next) => {
    if(req.session.user.role === "admin") {
        try {
            const { id } = req.params;
            const { name, description, price, duration, is_active } = req.body;

            if(!name || !description || !price || !duration || !is_active) {
                return res.status(400).render("admin/services", {
                    error: "Minden mező kitöltése kötelező!"
                });
            }

            const service = await updateService(id, { name, description, price, duration, is_active });

            return res.redirect("/admin/services");
        } catch(error) {
            return res.status(500).send("Hiba történt a szolgáltatás módosítása során!");
        }
    } else {
        return res.status(403).send("Nincs jogosultságod megtekinteni ezt az oldalt!");
    }
}

const deleteAService = async (req, res, next) => {
    if(req.session.user.role === "admin") {
        try {
            const { id } = req.params;

            const service = await deleteService(id);

            return res.redirect("/admin/services");
        } catch(error) {
            return res.status(500).send("Hiba történt a szolgáltatás törlése során!");
        }
    } else {
        return res.status(403).send("Nincs jogosultságod megtekinteni ezt az oldalt!");
    }
}

const showServicesPage = async (req, res, next) => {
    if(req.session.user.role === "admin") {
        try {
            const services = await getAllServices();

            return res.render("admin/services", {
                services
            });
        } catch(error) {
            return res.status(500).send("Hiba történt a szolgáltatások lekérése során!");
        }
    } else {
        return res.status(403).send("Nincs jogosultságod megtekinteni ezt az oldalt!");
    }
}

export {
    showAdminPage,
    showUserPage,
    showUserPageById,
    showServicesPage,
    createAService,
    updateAService,
    deleteAService
};
