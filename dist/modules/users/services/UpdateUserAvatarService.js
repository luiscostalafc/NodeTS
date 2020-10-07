"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const upload_1 = __importDefault(require("@config/upload"));
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
class UpdateUserAvatarService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ user_id, avatarFilename }) {
        const user = await this.usersRepository.findById(user_id);
        if (!user) {
            throw new AppError_1.default('Only authenticated users can change avatar', 401);
        }
        if (user.avatar) {
            const userAvatarFilePath = path_1.default.join(upload_1.default.directory, user.avatar);
            const userAvatarFileExists = await fs_1.default.promises.stat(userAvatarFilePath);
            if (userAvatarFileExists) {
                await fs_1.default.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFilename;
        await this.usersRepository.save(user);
        return user;
    }
}
exports.default = UpdateUserAvatarService;
