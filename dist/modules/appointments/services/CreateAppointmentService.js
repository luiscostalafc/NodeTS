"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
class CreateAppointmentService {
    constructor(appointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }
    async execute({ date, provider_id }) {
        const appointmentDate = date_fns_1.startOfHour(date);
        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);
        if (findAppointmentInSameDate) {
            throw new AppError_1.default('This appointment is already booked');
        }
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });
        return appointment;
    }
}
exports.default = CreateAppointmentService;
