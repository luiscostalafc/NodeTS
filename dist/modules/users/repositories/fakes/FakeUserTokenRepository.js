"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
const UserToken_1 = __importDefault(require("../../infra/typeorm/entities/UserToken"));
class FakeUsersTokensRepository {
    constructor() {
        this.userTokens = [];
    }
    async generate(user_id) {
        const userToken = new UserToken_1.default();
        Object.assign(userToken, {
            id: uuidv4_1.uuid(),
            token: uuidv4_1.uuid(),
            user_id,
            created_at: new Date(),
            updated_at: new Date(),
        });
        this.userTokens.push(userToken);
        return userToken;
    }
    async findByToken(token) {
        const userToken = this.userTokens.find(findToken => findToken.token === token);
        return userToken;
    }
}
exports.default = FakeUsersTokensRepository;
