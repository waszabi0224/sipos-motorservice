import { getAppointmentByUserId } from "../models/appointmentModel.js";
import { createBike, updateBike, deleteBike, getBikeByUserId } from "../models/bikeModel.js";

const createABike = async (req, res, next) => {
    try {
        const user_id = req.session.user.id;
        const { catalog_id } = req.body;

        if(!catalog_id) {
            const bikes = await getBikeByUserId(user_id);
            const appointments = await getAppointmentByUserId(user_id);

            return res.status(400).render("profile", {
                error: "Minden mező kitöltése kötelező!",
                bikes,
                appointments
            });
        }

        const bike = await createBike({ user_id, catalog_id });

        return res.redirect("/auth/profile");
    } catch(error) {
        return res.status(500).send("Hiba történt a motor létrehozása során!");
    }
}

const updateABike = async (req, res, next) => {
    try {
        const user_id = req.session.user.id;
        const { id } = req.params;
        const { catalog_id } = req.body;

        if(!catalog_id) {
            const bikes = await getBikeByUserId(user_id);
            const appointments = await getAppointmentByUserId(user_id);

            return res.status(400).render("profile", {
                error: "Minden mező kitöltése kötelező!",
                bikes,
                appointments
            });
        }

        const bike = await updateBike(id, { catalog_id });

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
