"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const upload_1 = __importDefault(require("../config/upload"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const User_1 = __importDefault(require("../models/User"));
class UpdateUserAvatarService {
    async execute({ user_id, avatarFilename }) {
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const user = await usersRepository.findOne(user_id);
        if (!user) {
            throw new AppError_1.default("Only authenticated users can change avatar", 401);
        }
        if (user.avatar) {
            const userAvatarFilePath = path_1.default.join(upload_1.default.directory, user.avatar);
            const userAvatarFileExists = await fs_1.default.promises.stat(userAvatarFilePath);
            if (userAvatarFileExists) {
                await fs_1.default.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFilename;
        await usersRepository.save(user);
        return user;
    }
}
exports.default = UpdateUserAvatarService;
