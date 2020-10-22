"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const FakeHashProvider_1 = __importDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));
const FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
const CreateUserService_1 = __importDefault(require("./CreateUserService"));
describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository_1.default();
        const fakeHashProvider = new FakeHashProvider_1.default();
        const createUser = new CreateUserService_1.default(fakeUsersRepository, fakeHashProvider);
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });
        expect(user).toHaveProperty('id');
    });
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository_1.default();
        const fakeHashProvider = new FakeHashProvider_1.default();
        const createUser = new CreateUserService_1.default(fakeUsersRepository, fakeHashProvider);
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });
        expect(user).toHaveProperty('id');
    });
    it('should not be able to create a new user with same email from another', async () => {
        const fakeUsersRepository = new FakeUsersRepository_1.default();
        const fakeHashProvider = new FakeHashProvider_1.default();
        const createUser = new CreateUserService_1.default(fakeUsersRepository, fakeHashProvider);
        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });
        await expect(createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError_1.default);
    });
});
