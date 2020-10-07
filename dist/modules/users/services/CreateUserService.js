"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
class CreateUserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ name, email, password }) {
        const checkUserExists = await this.usersRepository.findByEmail(email);
        if (checkUserExists) {
            throw new AppError_1.default('Email address already used.');
        }
        const hashedPassword = await bcryptjs_1.hash(password, 8);
        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        return user;
    }
}
exports.default = CreateUserService;
