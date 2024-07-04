'use strict'

import JobSeeker from "./jobSeeker.model.js"
import path from 'path'
import Imagen from './jobSeeker.model.js'
import curriculum from './jobSeeker.model.js'
import { fileURLToPath } from "url"
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadDir = path.join(__dirname, '../public/uploads')


export const save = async (req, res) => {
    try {
        let data = req.body;
        const validacion = validar(req.file, 'Y')
        if (validacion == '') {
            const imagen = new Imagen({
                name: data.name,
                description: data.description,
                curriculumVitae: req.file.filename,
            })
            await imagen.save()
            return res.send({ message: 'JobSeeker saved successfully.' })
        }
        return res.status(400).send({ message: 'Error saving JobSeeker.' })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error server.' });
    }


}

export const getImage = async (req, res) => {
    const dirname = 'public/uploads/'
    const { imagen } = req.params
    try {
        const img = path.resolve(`${dirname}${imagen}`)
        if (img)
            return res.sendFile(img)
        else
            return res.status(400).send({ message: 'Error get Imagen.' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error al obtener la imagen.' })
    }
}

export const get = async (req, res) => {
    try {
        let jobSeeker = await JobSeeker.find()
        if (jobSeeker.length === 0) return res.status(404).send({ message: 'There are not. ' })
        return res.send({ jobSeeker })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error getting jobSeeker.' })
    }
}

export const deleteJob = async (req, res) => {
    try {
        let { id } = req.params
        let deletedJobSeeker = await JobSeeker.deleteOne({ _id: id })
        if (deletedJobSeeker.deleteCount == 0) return res.status(404).send({ message: 'Alert not found and not deleted.' })
        return res.send({ message: 'Deleted JobSeeker successfully.' })
    } catch (error) {
        console.error(error)
        return res.send({ message: 'Error deleting JobSeeker.' })
    }
}

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body

        let updatedJob = await JobSeeker.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )

        if (!updatedJob) return res.status(404).send({ message: 'JobSeeker not found and not updated.' })
        return res.send({ message: 'JobSeeker updated successfully.', updatedJob })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error updating JobSeeker.' })
    }
}

const validar = (imagen, sevsalida) => {
    var errors = []
    if (sevsalida === 'Y' && !imagen) {
        errors.push('Select an image in jpg or PNG format.')
    } else {
        if (errors.length === 0) {
            let filePath = path.join(uploadDir, imagen.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                return ''
            }
        }
    }
    return errors
}