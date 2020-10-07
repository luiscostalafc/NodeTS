"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const date_fns_1 = require("date-fns");
const AppointmentsRepository_1 = __importDefault(require("@modules/appointments/infra/typeorm/repositories/AppointmentsRepository"));
const CreateAppointmentService_1 = __importDefault(require("@modules/appointments/services/CreateAppointmentService"));
const ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
const appointmentsRouter = express_1.Router();
const appointmentsRepository = new AppointmentsRepository_1.default();
appointmentsRouter.use(ensureAuthenticated_1.default);
appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;
    const parsedDate = date_fns_1.parseISO(date);
    const createAppointment = new CreateAppointmentService_1.default(appointmentsRepository);
    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
    });
    return response.json(appointment);
});
exports.default = appointmentsRouter;
