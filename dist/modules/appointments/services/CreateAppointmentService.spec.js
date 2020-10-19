"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const FakeAppointmentsRepository_1 = __importDefault(require("../repositories/fakes/FakeAppointmentsRepository"));
const CreateAppointmentService_1 = __importDefault(require("./CreateAppointmentService"));
describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository_1.default();
        const createAppointment = new CreateAppointmentService_1.default(fakeAppointmentsRepository);
        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '123123',
        });
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123');
    });
    it('should not be able to create two appointments on the same time', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository_1.default();
        const createAppointment = new CreateAppointmentService_1.default(fakeAppointmentsRepository);
        const appointmentDate = new Date(2020, 4, 10, 11);
        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123',
        });
        expect(createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123',
        })).rejects.toBeInstanceOf(AppError_1.default);
    });
});
