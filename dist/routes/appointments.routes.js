"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const date_fns_1 = require("date-fns");
const AppointmentsRepository_1 = __importDefault(require("../repositories/AppointmentsRepository"));
const CreateAppointmentService_1 = __importDefault(require("../services/CreateAppointmentService"));
const ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
const appointmentsRouter = express_1.Router();
appointmentsRouter.use(ensureAuthenticated_1.default);
appointmentsRouter.get("/", async (request, response) => {
    const appointmentsRepository = typeorm_1.getCustomRepository(AppointmentsRepository_1.default);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
});
appointmentsRouter.post("/", async (request, response) => {
    const { provider_id, date } = request.body;
    const parsedDate = date_fns_1.parseISO(date);
    const createAppointment = new CreateAppointmentService_1.default();
    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
    });
    return response.json(appointment);
});
exports.default = appointmentsRouter;
