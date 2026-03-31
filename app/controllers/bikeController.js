import { createBike, getServiceByBikeId, updateBike, deleteBike } from "../models/bikeModel.js";

const createABike = async (req, res, next) => {
    try {
        const user_id = req.session.user.id;
        const { brand, model, type, category, stroke, cylinder, generation } = req.body;

        if(!user_id || !brand || !model || !type || !category || !stroke || !cylinder || !generation) {
            return res.status(400).render("profile", {
                error: "Minden mező kitöltése kötelező!"
            });
        }

        const bike = await createBike({ user_id, brand, model, type, category, stroke, cylinder, generation });

        return res.redirect("/auth/profile");
    } catch(error) {
        return res.status(500).send("Hiba történt a motor létrehozása során!");
    }
}

const updateABike = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { brand, model, type, category, stroke, cylinder, generation } = req.body;

        if(!brand || !model || !type || !category || !stroke || !cylinder || !generation) {
            return res.status(400).render("profile", {
                error: "Minden mező kitöltése kötelező!"
            });
        }

        const bike = await updateBike(id, { brand, model, type, category, stroke, cylinder, generation });

        return res.redirect("/auth/profile");
    } catch(error) {
        return res.status(500).send("Hiba történt a motor módosítása során!");
    }
}

const deleteABike = async (req, res, next) => {
    try {
        const { id } = req.params;

        const bike = await deleteBike(id);

        return res.redirect("/auth/profile");
    } catch(error) {
        return res.status(500).send("Hiba történt a motor törlése során!");
    }
}

export {
    createABike,
    updateABike,
    deleteABike
};
