"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Appointment_1 = __importDefault(require("../models/Appointment"));
let AppointmentsRepository = class AppointmentsRepository extends typeorm_1.Repository {
    async findByDate(date) {
        const findAppointment = await this.findOne({
            where: { date },
        });
        return findAppointment || null;
    }
};
AppointmentsRepository = __decorate([
    typeorm_1.EntityRepository(Appointment_1.default)
], AppointmentsRepository);
exports.default = AppointmentsRepository;
