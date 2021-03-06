"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
const FakeUserTokenRepository_1 = __importDefault(require("../repositories/fakes/FakeUserTokenRepository"));
const FakeHashProvider_1 = __importDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));
const ResetPasswordService_1 = __importDefault(require("./ResetPasswordService"));
let fakeUsersRepository;
let fakeUserTokensRepository;
let fakeHashProvider;
let resetPassword;
describe('ResetPasswordService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository_1.default();
        fakeUserTokensRepository = new FakeUserTokenRepository_1.default();
        fakeHashProvider = new FakeHashProvider_1.default();
        resetPassword = new ResetPasswordService_1.default(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider);
    });
    it('should be able to reset the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });
        const { token } = await fakeUserTokensRepository.generate(user.id);
        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
        await resetPassword.execute({
            password: '123123',
            token,
        });
        const updateUser = await fakeUsersRepository.findById(user.id);
        expect(generateHash).toHaveBeenLastCalledWith('123123');
        expect(updateUser === null || updateUser === void 0 ? void 0 : updateUser.password).toBe('123123');
    });
    it('should not be able to reset the password with non-existing token', async () => {
        await expect(resetPassword.execute({
            token: 'non-existing-token',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError_1.default);
    });
    it('should not be able to reset the password with non-existing user', async () => {
        const { token } = await fakeUserTokensRepository.generate('non-existing-user');
        await expect(resetPassword.execute({
            token,
            password: '123456',
        })).rejects.toBeInstanceOf(AppError_1.default);
    });
    it('should not be able to reset password if passed more than 2 hours', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });
        const { token } = await fakeUserTokensRepository.generate(user.id);
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();
            return customDate.setHours(customDate.getHours() + 3);
        });
        await expect(resetPassword.execute({
            password: '123123',
            token,
        })).rejects.toBeInstanceOf(AppError_1.default);
    });
});
