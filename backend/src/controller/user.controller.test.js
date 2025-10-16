const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUserController, deleteUserController, loginController } = require('../controller/user.controller');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('createUserController', () => {
    let req;
    let res;
    let mockGetUserByEmail;
    let mockCreateUser;

    beforeEach(() => {
        req = {
            body: { email: 'test@example.com', password: 'password123' },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockGetUserByEmail = jest.fn();
        mockCreateUser = jest.fn();

        jest.clearAllMocks();
    });

    test('status 400 if email was register', async () => {
        mockGetUserByEmail.mockResolvedValue({ email: 'test@example.com' });

        const controller = createUserController({
            getUserByEmail: mockGetUserByEmail,
            createUser: mockCreateUser,
        });

        await controller(req, res);

        expect(mockGetUserByEmail).toHaveBeenCalledWith('test@example.com');
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'El correo electrónico ya está registrado.',
        });
    });

    test('create new user if email is not register', async () => {
        mockGetUserByEmail.mockResolvedValue(null);
        bcrypt.hash.mockResolvedValue('hashedPassword123');
        mockCreateUser.mockResolvedValue({ id: 10, email: 'test@example.com' });

        const controller = createUserController({
            getUserByEmail: mockGetUserByEmail,
            createUser: mockCreateUser,
        });

        await controller(req, res);

        expect(mockGetUserByEmail).toHaveBeenCalledWith('test@example.com');
        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
        expect(mockCreateUser).toHaveBeenCalledWith('test@example.com', 'hashedPassword123');
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            id: 10,
            email: 'test@example.com',
            message: 'Usuario creado con éxito.',
        });
    });

    test('status must be 500 for an unexpected error', async () => {
        mockGetUserByEmail.mockRejectedValue(new Error('DB error'));

        const controller = createUserController({
            getUserByEmail: mockGetUserByEmail,
            createUser: mockCreateUser,
        });

        await controller(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error al crear el usuario.',
            error: 'DB error',
        });
    });
});

describe('loginController', () => {
    let req;
    let res;
    let mockGetUserByEmail;
    const JWT_SECRET = 'your_jwt_secret';

    beforeEach(() => {
        req = {
            body: { email: 'test@example.com', password: 'password123' }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        mockGetUserByEmail = jest.fn();
        global.JWT_SECRET = JWT_SECRET;

        jest.clearAllMocks();
    });

    test('status 401 user not exist', async () => {
        mockGetUserByEmail.mockResolvedValue(null);

        const controller = loginController({ getUserByEmail: mockGetUserByEmail });
        await controller(req, res);

        expect(mockGetUserByEmail).toHaveBeenCalledWith('test@example.com');
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Credenciales inválidas.'
        });
    });

    test('status 401 mis password', async () => {
        mockGetUserByEmail.mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: 'hashedPassword'
        });

        bcrypt.compare.mockResolvedValue(false);

        const controller = loginController({ getUserByEmail: mockGetUserByEmail });
        await controller(req, res);

        expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Credenciales inválidas.'
        });
    });

    test('status 200 return a token', async () => {
        mockGetUserByEmail.mockResolvedValue({
            id: '1',
            email: 'test@example.com',
            password: 'hashedPassword'
        });

        bcrypt.compare.mockResolvedValue(true);

        const controller = loginController({ getUserByEmail: mockGetUserByEmail });
        await controller(req, res);

        jwt.sign.mockResolvedValue('fake-jwt-token');
        const token = expect(jwt.sign)
            .toHaveBeenCalledWith(
                { id: '1', email: 'test@example.com' },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            token
        });
    });

    test('status 500 unexpected error', async () => {
        mockGetUserByEmail.mockRejectedValue(new Error('DB error'));

        const controller = loginController({ getUserByEmail: mockGetUserByEmail });
        await controller(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error al iniciar sesión.',
            error: 'DB error'
        });
    });
});


describe('deleteUserController', () => {
    let req;
    let res;
    let mockDeleteUser;

    beforeEach(() => {
        req = { params: { id: '123' } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockDeleteUser = jest.fn();

        jest.clearAllMocks();
    });

    test('status 400 there are not id', async () => {
        req.params = {};

        const controller = deleteUserController({ deleteUser: mockDeleteUser });
        await controller(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'ID del usuario es obligatorio.',
        });
        expect(mockDeleteUser).not.toHaveBeenCalled();
    });

    test('status 200 user deleted', async () => {
        mockDeleteUser.mockResolvedValue();

        const controller = deleteUserController({ deleteUser: mockDeleteUser });
        await controller(req, res);

        expect(mockDeleteUser).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Usuario eliminado.',
        });
    });

    test('status 500 DB error', async () => {
        mockDeleteUser.mockRejectedValue(new Error('DB error'));

        const controller = deleteUserController({ deleteUser: mockDeleteUser });
        await controller(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error al realizar el borrado del usuario.',
            error: 'DB error',
        });
    });
});
