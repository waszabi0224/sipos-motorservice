import { getAllServices, getServiceById } from "../models/serviceModel.js";

const showServicePage = async (req, res) => {
    try {
        const services = await getAllServices();

        return res.render("services", {
            services
        });
    } catch(error) {
        return res.status(500).send("Hiba történt a szolgáltatások lekérése során!");
    };
}

const showAppointmentServicePage = async (req, res) => {
    try {
        const services = await getAllServices();

        return res.render("appointmentService", {
            services
        });
    } catch(error) {
        return res.status(500).send("Hiba történt a szolgáltatások lekérése során!");
    };
}

const showServiceDetailsPage = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await getServiceById(id);

        return res.render("serviceDetails", {
            service
        });
    } catch(error) {
        return res.status(500).send("Hiba történt a szolgáltatás részleteinek lekérése során!");
    };
}

export {
    showServicePage,
    showAppointmentServicePage,
    showServiceDetailsPage
};
