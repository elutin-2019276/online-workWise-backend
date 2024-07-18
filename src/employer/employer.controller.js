'use strict';

import mongoose from 'mongoose';
import Employer from '../employer/employer.model.js';
import User from '../user/user.model.js';

// Función para obtener todos los empleadores
export const getEmployer = async (req, res) => {
    try {
        const employers = await Employer.find();
        if (!employers.length) {
            return res.status(404).send({ message: 'No employers found.' });
        }
        res.status(200).send(employers);
    } catch (error) {
        console.error('Error getting employers:', error.message, error.stack);
        res.status(500).send({ message: 'Error obtaining employer information.', error: error.message });
    }
};

export const saveEmployer = async (req, res) => {
    const { companyName, descriptionCompany, phone, user } = req.body;

    if (!user) {
        return res.status(400).send({ message: 'User is required.' });
    }

    try {
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).send({ message: `User with ID "${user}" not found.` });
        }

        const newEmployer = new Employer({ 
            companyName, 
            descriptionCompany, 
            phone, 
            user: new mongoose.Types.ObjectId(user)
        });
        
        const savedEmployer = await newEmployer.save();
        
        res.status(201).send({
            message: `Employer saved successfully for user ${existingUser.name}.`,
            employer: savedEmployer,
            userName: existingUser.name
        });
    } catch (error) {
        console.error('Error saving employer:', error);
        res.status(500).send({ message: 'Error saving employer.', error: error.message });
    }
};

// Función para actualizar un empleador
export const updateEmployer = async (req, res) => {
    const { id } = req.params;
    const { companyName, descriptionCompany, phone } = req.body;
    try {
        const updatedEmployer = await Employer.findByIdAndUpdate(
            id,
            { companyName, descriptionCompany, phone },
            {
                new: true,
                runValidators: true
            }
        );
        if (!updatedEmployer) {
            return res.status(404).send({ message: 'Employer not found.' });
        }
        res.status(200).send(updatedEmployer);
    } catch (error) {
        console.error('Error updating employer:', error.message, error.stack);
        res.status(500).send({ message: 'Error updating employer information.', error: error.message });
    }
};

// Función para eliminar un empleador
export const deleteEmployer = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEmployer = await Employer.findByIdAndDelete(id);
        if (!deletedEmployer) {
            return res.status(404).send({ message: 'Employer not found.' });
        }
        res.status(200).send({ message: 'Employer deleted successfully.' });
    } catch (error) {
        console.error('Error deleting employer:', error.message, error.stack);
        res.status(500).send({ message: 'Error deleting employer.', error: error.message });
    }
};
