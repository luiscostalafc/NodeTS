"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ForgotPasswordController_1 = __importDefault(require("../controllers/ForgotPasswordController"));
const ResetPasswordController_1 = __importDefault(require("../controllers/ResetPasswordController"));
const passwordRouter = express_1.Router();
const forgotPasswordController = new ForgotPasswordController_1.default();
const resetPasswordController = new ResetPasswordController_1.default();
passwordRouter.post('/', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);
exports.default = passwordRouter;
