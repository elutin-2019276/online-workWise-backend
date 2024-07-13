'use strict';

import Profession from './profession.model.js';
import User from '../user/user.model.js';

export const getProfession = async (req, res) => {
    try {
        const professions = await Profession.find().populate('user')
        if (!professions.length) {
            return res.status(404).send({ message: 'No professions found.' })
        }
        res.status(200).send(professions)
    } catch (error) {
        console.error('Error getting professions:', error.message, error.stack)
        res.status(500).send({ message: 'Error obtaining professions information.', error: error.message })
    }
}

export const saveProfession = async (req, res) => {
    const { name, description, user } = req.body;
    try {
        // Verificar si ya existe una profesión con el mismo nombre
        const existingProfession = await Profession.findOne({ name })
        if (existingProfession) {
            return res.status(400).send({ message: `Profession with name "${name}" already exists.` })
        }
        // Verificar si el usuario existe
        const existingUser = await User.findById(user)
        if (!existingUser) {
            return res.status(404).send({ message: `User with ID "${user}" not found.` })
        }
        // Crear y guardar una nueva profesión
        const newProfession = new Profession({ name, description, user })
        const savedProfession = await newProfession.save();
        // Incluir el nombre del usuario en la respuesta
        res.status(201).send({
            message: `Profession saved successfully for user ${existingUser.name}`,
            profession: savedProfession,
            userName: existingUser.name
        });
    } catch (err) {
        console.error('Error saving profession:', err);
        res.status(500).send({ message: 'Error saving profession.', error: err.message });
    }
}

export const updateProfession = async (req, res) => {
    const { id } = req.params;
    const { name, description, user } = req.body;
    try {
        // Verificar si el usuario existe
        if (user) {
            const existingUser = await User.findById(user);
            if (!existingUser) {
                return res.status(404).send({ message: `User with ID "${user}" not found.` })
            }
        }
        const updatedProfession = await Profession.findByIdAndUpdate(
            id,
            { name, description, user },
            { new: true, runValidators: true }
        ).populate('user')
        if (!updatedProfession) {
            return res.status(404).send({ message: 'Profession not found.' })
        }
        res.status(200).send(updatedProfession)
    } catch (err) {
        console.error('Error updating profession:', err);
        res.status(500).send({ message: 'Error updating profession.' })
    }
}

export const deleteProfession = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProfession = await Profession.findByIdAndDelete(id)
        if (!deletedProfession) {
            return res.status(404).send({ message: 'Profession not found.' })
        }
        res.status(200).send({ message: 'Profession deleted successfully.' })
    } catch (err) {
        console.error('Error deleting profession:', err)
        res.status(500).send({ message: 'Error deleting profession.' })
    }
}