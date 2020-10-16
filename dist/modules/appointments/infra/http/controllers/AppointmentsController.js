"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const date_fns_1 = require("date-fns");
const CreateAppointmentService_1 = __importDefault(require("@modules/appointments/services/CreateAppointmentService"));
class AppointmentsController {
    async create(request, response) {
        const { provider_id, date } = request.body;
        const parseDate = date_fns_1.parseISO(date);
        const createAppointment = tsyringe_1.container.resolve(CreateAppointmentService_1.default);
        const appointment = await createAppointment.execute({
            date: parseDate,
            provider_id,
        });
        return response.json(appointment);
    }
}
exports.default = AppointmentsController;
