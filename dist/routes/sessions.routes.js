"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthenticateUserService_1 = __importDefault(require("../services/AuthenticateUserService"));
const sessionsRouter = express_1.Router();
sessionsRouter.post("/", async (request, response) => {
    const { email, password } = request.body;
    const authenticateUser = new AuthenticateUserService_1.default();
    const { user, token } = await authenticateUser.execute({
        email,
        password,
    });
    delete user.password;
    return response.json({ user, token });
});
exports.default = sessionsRouter;
