"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../entities/User"));
class UsersRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(User_1.default);
    }
    async findById(id) {
        const user = await this.ormRepository.findOne(id);
        return user;
    }
    async findByEmail(email) {
        const user = await this.ormRepository.findOne({
            where: { email },
        });
        return user;
    }
    async create(userData) {
        const appointment = this.ormRepository.create(userData);
        await this.ormRepository.save(appointment);
        return appointment;
    }
    async save(user) {
        return this.ormRepository.save(user);
    }
}
exports.default = UsersRepository;
