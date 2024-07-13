'use strict';

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
    const { id, companyName, descriptionCompany, phone, user } = req.body;
    try {
        // Verificar si ya existe un empleador con el mismo companyName
        const existingEmployer = await Employer.findOne({ companyName });
        if (existingEmployer) {
            return res.status(400).send({ message: `Employer with company name "${companyName}" already exists.` })
        }
        // Crear un nuevo documento de Employer
        const newEmployer = new Employer({
            companyName,
            descriptionCompany,
            phone,
            user
        });
        const savedEmployer = await newEmployer.save();
        // Actualizar el usuario para referenciar al nuevo empleador
        await User.findByIdAndUpdate(
            id,
            { employer: savedEmployer._id },
            { new: true }
        );
        res.status(201).send({ message: 'Employer saved successfully.', employer: savedEmployer })
    } catch (error) {
        console.error('Error saving employer:', error.message, error.stack)
        res.status(500).send({ message: 'Error saving employer.', error: error.message })
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
            return res.status(404).send({ message: 'Employer not found.' })
        }
        res.status(200).send(updatedEmployer)
    } catch (error) {
        console.error('Error updating employer:', error.message, error.stack)
        res.status(500).send({ message: 'Error updating employer information.', error: error.message })
    }
};

// Función para eliminar un empleador
export const deleteEmployer = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEmployer = await Employer.findByIdAndDelete(id)
        if (!deletedEmployer) {
            return res.status(404).send({ message: 'Employer not found.' })
        }
        res.status(200).send({ message: 'Employer deleted successfully.' })
    } catch (error) {
        console.error('Error deleting employer:', error.message, error.stack)
        res.status(500).send({ message: 'Error deleting employer.', error: error.message })
    }
};