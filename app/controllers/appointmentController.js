import { createAppointment } from "../models/appointmentModel.js";
import { createAppointmentService } from "../models/appointmentServiceModel.js";
import { getBikeById, getBikeByUserId } from "../models/bikeModel.js";

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
        appointment_time: req.body.appointment_time
    };

    return res.redirect("/auth/appointment/data");
}

const showDatasPage = async (req, res) => {
    try {
        const bikes = await getBikeByUserId(req.session.user.id);

        return res.render("appointmentData", {
            error: null,
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
            note: req.body.note
        };

        if(req.session.appointment.bike_id) {
            const bike = await getBikeById(req.session.appointment.bike_id);

            if(!bike) {
                return res.status(400).send("Nincs ilyen motorod!");
            }

            req.session.appointment = {
                ...req.session.appointment,
                bike_brand: bike.brand,
                bike_model: bike.model,
                bike_type: bike.type,
                bike_category: bike.category,
                bike_stroke: bike.stroke,
                bike_cylinder: bike.cylinder,
                bike_generation: bike.generation
            };
        } else {
            req.session.appointment = {
                ...req.session.appointment,
                bike_brand: req.body.bike_brand,
                bike_model: req.body.bike_model,
                bike_type: req.body.bike_type,
                bike_category: req.body.bike_category,
                bike_stroke: req.body.bike_stroke,
                bike_cylinder: req.body.bike_cylinder,
                bike_generation: req.body.bike_generation
            };
        }
    
        const appointmentDatas = req.session.appointment;

        const appointment = await createAppointment({
            user_id: appointmentDatas.user_id,
            bike_id: appointmentDatas.bike_id,
            appointment_date: appointmentDatas.appointment_date,
            appointment_time: appointmentDatas.appointment_time,
            bike_brand: appointmentDatas.bike_brand,
            bike_model: appointmentDatas.bike_model,
            bike_type: appointmentDatas.bike_type,
            bike_category: appointmentDatas.bike_category,
            bike_stroke: appointmentDatas.bike_stroke,
            bike_cylinder: appointmentDatas.bike_cylinder,
            bike_generation: appointmentDatas.bike_generation,
            note: appointmentDatas.note,
            status: "Feldolgozás alatt"
        });

        for (const service_id of appointmentDatas.service_ids) {
            await createAppointmentService(appointment.id, service_id);
        }

        delete req.session.appointment;

        console.log("sikeres foglalás!");
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
