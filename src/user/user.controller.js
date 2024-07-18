'use strict';

import User from './user.model.js';
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js';
import { generateJwt } from '../utils/jwt.js';

export const test = (req, res) => {
    return res.send('Hello World.');
};

export const userDefect = async () => {
    try {
        // Verifica si existe el usuario ADMINB
        let adminUser = await User.findOne({ username: 'ADMINB' });
        if (adminUser) {
            console.log('Usuario ADMINB ya existe');
        } else {
            // Encripta la contraseña para ADMINB
            const encryptAdminPassword = await encrypt('ADMINB');
            
            // Crea el usuario ADMINB por defecto
            const newAdminUser = new User({
                name: 'ADMINB',
                surname: 'Admin',
                username: 'ADMINB',
                password: encryptAdminPassword,
                email: 'admin@example.com',
                phone: '12345678',
                locality: 'Admin',
                profession: 'Administrador',
                role: 'Admin'
            });
            
            await newAdminUser.save();
            console.log('Usuario ADMINB creado exitosamente');
        }

        // Verifica si existe el usuario USER
        let userUser = await User.findOne({ username: 'USER' });
        if (userUser) {
            console.log('Usuario USER ya existe');
        } else {
            // Encripta la contraseña para USER
            const encryptUserPassword = await encrypt('USERPASSWORD');
            
            // Crea el usuario USER por defecto
            const newUserUser = new User({
                name: 'Default',
                surname: 'User',
                username: 'USER',
                password: encryptUserPassword,
                email: 'user@example.com',
                phone: '87654321',
                locality: 'UserLocality',
                role: 'Solicitante de empleo'
            });
            
            await newUserUser.save();
            console.log('Usuario USER creado exitosamente');
        }
    } catch (err) {
        console.error('Error al crear usuarios por defecto', err);
    }
};

export const register = async (req, res) => {
    try {
        let data = req.body;
        data.password = await encrypt(data.password);
        let user = new User(data);
        await user.save();
        return res.send({ message: 'Registered successfully' });
    } catch (err) {
        console.error('Error registering user', err);
        return res.status(500).send({ message: 'Error registering user', err });
    }
};

export const login = async (req, res) => {
    try {
        let { username, password } = req.body;
        let user = await User.findOne({ username });
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            };
            let token = await generateJwt(loggedUser);
            return res.send({
                message: `Welcome ${user.name}`,
                loggedUser,
                token
            });
        }
        return res.status(404).send({ message: 'Invalid credentials.' });
    } catch (err) {
        console.error('Failed to login.', err);
        return res.status(500).send({ message: 'Failed to login.' });
    }
};

export const update = async (req, res) => {
    try {
        let { id } = req.params;
        let data = req.body;
        let update = checkUpdate(data, id);
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data.' });
        let updatedUser = await User.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        );
        if (!updatedUser) return res.status(404).send({ message: 'User not found and not updated.' });
        return res.send({ message: 'Updated user', updatedUser });
    } catch (err) {
        console.error('Error updating account.', err);
        if (err.keyValue && err.keyValue.username) return res.status(400).send({ message: `Username ${err.keyValue.username} is already taken` });
        return res.status(500).send({ message: 'Error updating account.' });
    }
};

export const deleteU = async (req, res) => {
    try {
        let { id } = req.params;
        let deletedUser = await User.findOneAndDelete({ _id: id });
        if (!deletedUser) return res.status(404).send({ message: 'Account not found and not deleted.' });
        return res.send({ message: `Account with username ${deletedUser.username} deleted successfully.` });
    } catch (err) {
        console.error('Error deleting account.', err);
        return res.status(500).send({ message: 'Error deleting account.' });
    }
};

export const getUser = async (req, res) => {
    try {
        let id = req.user._id;
        let user = await User.findById(id);
        if (!user) return res.status(404).send({ message: 'User not found.' });
        return res.send({ message: 'User details.', user });
    } catch (err) {
        console.error('Error getting user.', err);
        return res.status(500).send({ message: 'Error getting user.', err });
    }
};
