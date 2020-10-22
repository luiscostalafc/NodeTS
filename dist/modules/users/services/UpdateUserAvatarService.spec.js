"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const FakeStorageProvider_1 = __importDefault(require("@shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));
const FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
const UpdateUserAvatarService_1 = __importDefault(require("./UpdateUserAvatarService"));
describe('UpdateUserAvatar', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository_1.default();
        const fakeStorageProvider = new FakeStorageProvider_1.default();
        const updateUserAvatar = new UpdateUserAvatarService_1.default(fakeUsersRepository, fakeStorageProvider);
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });
        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpeg',
        });
        expect(user.avatar).toBe('avatar.jpeg');
    });
    it('should not be able to update avatar from non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository_1.default();
        const fakeStorageProvider = new FakeStorageProvider_1.default();
        const updateUserAvatar = new UpdateUserAvatarService_1.default(fakeUsersRepository, fakeStorageProvider);
        expect(updateUserAvatar.execute({
            user_id: 'non-existing-user',
            avatarFilename: 'avatar.jpeg',
        })).rejects.toBeInstanceOf(AppError_1.default);
    });
    it('should delete old avatar when updating new one', async () => {
        const fakeUsersRepository = new FakeUsersRepository_1.default();
        const fakeStorageProvider = new FakeStorageProvider_1.default();
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
        const updateUserAvatar = new UpdateUserAvatarService_1.default(fakeUsersRepository, fakeStorageProvider);
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });
        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpeg',
        });
        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpeg',
        });
        expect(deleteFile).toHaveBeenCalledWith('avatar.jpeg');
        expect(user.avatar).toBe('avatar.jpeg');
    });
});
