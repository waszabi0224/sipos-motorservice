import { createAppointment } from "../models/appointmentModel.js";
import { createAppointmentService } from "../models/appointmentServiceModel.js";
import { getBikeById, getBikeByUserId } from "../models/bikeModel.js";
import { getAllCategories } from "../models/catalogModel.js";

const selectService = (req, res) => {
    const user_id = req.session.user.id;
    const { service_ids } = req.body;

    req.session.appointment = {
        user_id: user_id,
        service_ids: Array.isArray(service_ids) ? service_ids : [service_ids]
    };

    return res.redirect("/auth/appointment/time");
};

const showTimePage = (req, res) => {
    res.render("appointmentTime", {
        error: null
    });
}

const selectTime = (req, res) => {
    req.session.appointment = {
        ...req.session.appointment,
        appointment_date: req.body.appointment_date,
        appointment_time: req.body.appointment_time,
        delivery_method: req.body.delivery_method,
        service_urgency: req.body.service_urgency
    };

    return res.redirect("/auth/appointment/data");
}

const showDatasPage = async (req, res) => {
    try {
        const categories = await getAllCategories();
        const bikes = await getBikeByUserId(req.session.user.id);

        return res.render("appointmentData", {
            error: null,
            categories,
            bikes
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Hiba történt az oldal betöltése során.");
    }
}

const upDatasAndSave = async (req, res) => {
    try {
        req.session.appointment = {
            ...req.session.appointment,
            bike_id: req.body.bike_id || null,
            catalog_id: req.body.catalog_id,
            note: req.body.note
        };

        if(req.session.appointment.bike_id) {
            const bike = await getBikeById(req.session.appointment.bike_id);

            if(!bike) {
                return res.status(400).send("Nincs ilyen motorod!");
            }

            req.session.appointment = {
                ...req.session.appointment,
                catalog_id: bike.catalog_id
            };
        }
    
        const appointmentDatas = req.session.appointment;

        if(!appointmentDatas.catalog_id) {
            const categories = await getAllCategories();
            const bikes = await getBikeByUserId(req.session.user.id);

            return res.status(400).render("appointmentData", {
                error: "Motor adatait kötelező megadni.",
                categories,
                bikes
            });
        }

        const appointment = await createAppointment({
            user_id: appointmentDatas.user_id,
            bike_id: appointmentDatas.bike_id,
            appointment_date: appointmentDatas.appointment_date,
            appointment_time: appointmentDatas.appointment_time,
            delivery_method: appointmentDatas.delivery_method,
            service_urgency: appointmentDatas.service_urgency,
            catalog_id : appointmentDatas.catalog_id,
            note: appointmentDatas.note,
            status: "Feldolgozás alatt"
        });

        for (const service_id of appointmentDatas.service_ids) {
            await createAppointmentService(appointment.id, service_id);
        }

        delete req.session.appointment;

        return res.redirect("/auth/profile");
    } catch(error) {
        console.log("hiba: ", error);
        return res.status(500).render("appointmentData", {
            error
        })
    }
};

export {
    selectService,
    showTimePage,
    selectTime,
    showDatasPage,
    upDatasAndSave
};
