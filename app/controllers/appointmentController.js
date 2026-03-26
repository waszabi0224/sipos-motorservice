import { createAppointment } from "../models/appointmentModel.js";
import { createAppointmentService } from "../models/appointmentServiceModel.js";

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

const showDatasPage = (req, res) => {
    res.render("appointmentData", {
        error: null
    });
}

const upDatasAndSave = async (req, res) => {
    req.session.appointment = {
        ...req.session.appointment,
        vehicle_brand: req.body.vehicle_brand,
        vehicle_type: req.body.vehicle_type,
        license_plate: req.body.license_plate,
        note: req.body.note
    };

    const appointmentDatas = req.session.appointment;

    try {
        const appointment = await createAppointment({
            user_id: appointmentDatas.user_id,
            appointment_date: appointmentDatas.appointment_date,
            appointment_time: appointmentDatas.appointment_time,
            vehicle_brand: appointmentDatas.vehicle_brand,
            vehicle_type: appointmentDatas.vehicle_type,
            license_plate: appointmentDatas.license_plate,
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
            error: "Hiba történt az időpontfoglalás során!"
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
