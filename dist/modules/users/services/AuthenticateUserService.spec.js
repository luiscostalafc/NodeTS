"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
const FakeHashProvider_1 = __importDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));
const AuthenticateUserService_1 = __importDefault(require("./AuthenticateUserService"));
const CreateUserService_1 = __importDefault(require("./CreateUserService"));
describe('AuthenticateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository_1.default();
        const fakeHashProvider = new FakeHashProvider_1.default();
        const createUser = new CreateUserService_1.default(fakeUsersRepository, fakeHashProvider);
        const authenticateUser = new AuthenticateUserService_1.default(fakeUsersRepository, fakeHashProvider);
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });
        const response = await authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123456',
        });
        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });
    it('should not be able to authenticate with non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository_1.default();
        const fakeHashProvider = new FakeHashProvider_1.default();
        const authenticateUser = new AuthenticateUserService_1.default(fakeUsersRepository, fakeHashProvider);
        expect(authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError_1.default);
    });
    it('should not be able to authenticate with wrong password', async () => {
        const fakeUsersRepository = new FakeUsersRepository_1.default();
        const fakeHashProvider = new FakeHashProvider_1.default();
        const createUser = new CreateUserService_1.default(fakeUsersRepository, fakeHashProvider);
        const authenticateUser = new AuthenticateUserService_1.default(fakeUsersRepository, fakeHashProvider);
        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });
        await expect(authenticateUser.execute({
            email: 'johndoe@example.com',
            password: 'wrong-password',
        })).rejects.toBeInstanceOf(AppError_1.default);
    });
});
