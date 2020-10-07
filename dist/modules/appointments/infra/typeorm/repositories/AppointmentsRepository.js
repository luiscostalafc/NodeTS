"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Appointment_1 = __importDefault(require("../entities/Appointment"));
class AppointmentsRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(Appointment_1.default);
    }
    async findByDate(date) {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });
        return findAppointment;
    }
    async create({ provider_id, date, }) {
        const appointment = this.ormRepository.create({ provider_id, date });
        await this.ormRepository.save(appointment);
        return appointment;
    }
}
exports.default = AppointmentsRepository;
