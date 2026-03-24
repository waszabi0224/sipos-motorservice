import { getUserById, getAllUsers } from "../models/userModel.js";

const showAdminPage = (req, res) => {
    res.render("admin/adminHome", {
        error: null
    });
}

const showUserPage = async (req, res, next) => {
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

export {
    showAdminPage,
    showUserPage,
    showUserPageById
};
