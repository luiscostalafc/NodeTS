"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = __importDefault(require("../errors/AppError"));
const User_1 = __importDefault(require("../models/User"));
class CreateUserService {
    async execute({ name, email, password }) {
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });
        if (checkUserExists) {
            throw new AppError_1.default("Email address already used.");
        }
        const hashedPassword = await bcryptjs_1.hash(password, 8);
        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        await usersRepository.save(user);
        return user;
    }
}
exports.default = CreateUserService;
