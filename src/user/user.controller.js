'use strict'

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res) => {
    return res.send('Hello World.')
}

export const userDefect = async (req, res) => {
    try {
        const userExists = await User.findOne({ username: 'ADMINB' });
        if (userExists) {
            console.log('Usuario existente');
        } else {
            const encryptPassword = await encrypt('ADMINB');
            const newUser = new User({
                name: 'ADMINB',
                surname: 'Admin', // Agregar el campo requerido 'surname'
                username: 'ADMINB',
                password: encryptPassword,
                email: 'admin@example.com',
                phone: '12345678',
                locality: 'Admin', // Campo opcional, puede ser ajustado según necesidad
                profession: 'Administrador', // Usar un valor válido del enum
                role: 'Admin' // Usar un valor válido del enum
            });
            await newUser.save();
            console.log('Usuario ADMIN creado exitosamente');
        }
    } catch (err) {
        console.error('Error al crear usuario ADMIN por defecto', err);
    }
};

export const register = async (req, res) => {
    try {
        let data = req.body;
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.send({ message: 'Registered succesfully' })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error registering user', err })
    }
}

export const login = async (req, res) => {
    try {
        let { username, password } = req.body
        let user = await User.findOne({ username })
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(404).send({ message: 'Invalid credentials.' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Failed to login.' })
    }
}

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have sumbmitted some data that cannot be updated or missing data.' })
        let updatedUser = await User.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updatedUser) return res.status(401).send({ message: 'User not found and not updated.' })
        return res.send({ message: 'Updated user', updatedUser })
    } catch (err) {
        console.error(err)
        if (err.keyValue.username) return res.status(400).send({ message: `Username ${err.keyValue.username} is already taken` })
        return res.status(500).send({ message: 'Error updating account.' })
    }
}

export const deleteU = async (req, res) => {
    try {
        let { id } = req.params
        let deletedUser = await User.findOneAndDelete({ _id: id })
        if (!deletedUser) return res.status(404).send({ message: 'Account not found and not deleted.' })
        return res.send({ message: `Account with username ${deletedUser.username} deleted successfully.` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting account.' })
    }
}


export const getUser = async (req, res) => {
    try {
        let id = req.user
        let user = await User.find({ user: id })
        return res.send({ message: 'Your users.', user })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting user.', err })
    }
}