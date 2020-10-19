"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
const date_fns_1 = require("date-fns");
const Appointment_1 = __importDefault(require("../../infra/typeorm/entities/Appointment"));
class AppointmentsRepository {
    constructor() {
        this.appointments = [];
    }
    async findByDate(date) {
        const findAppointment = this.appointments.find(appointment => date_fns_1.isEqual(appointment.date, date));
        return findAppointment;
    }
    async create({ provider_id, date, }) {
        const appointment = new Appointment_1.default();
        Object.assign(appointment, { id: uuidv4_1.uuid(), date, provider_id });
        this.appointments.push(appointment);
        return appointment;
    }
}
exports.default = AppointmentsRepository;
