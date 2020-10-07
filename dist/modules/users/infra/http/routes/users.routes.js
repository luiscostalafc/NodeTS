"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("@config/upload"));
const UsersRepositories_1 = __importDefault(require("@modules/users/infra/typeorm/repositories/UsersRepositories"));
const CreateUserService_1 = __importDefault(require("@modules/users/services/CreateUserService"));
const UpdateUserAvatarService_1 = __importDefault(require("@modules/users/services/UpdateUserAvatarService"));
const ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
const usersRouter = express_1.Router();
const upload = multer_1.default(upload_1.default);
const usersRepository = new UsersRepositories_1.default();
usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService_1.default(usersRepository);
    const user = await createUser.execute({
        name,
        email,
        password,
    });
    delete user.[password];
    return response.json(user);
});
usersRouter.patch('/avatar', ensureAuthenticated_1.default, upload.single('avatar'), async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService_1.default(usersRepository);
    const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
    });
    delete user.password;
    return response.json(user);
});
exports.default = usersRouter;
