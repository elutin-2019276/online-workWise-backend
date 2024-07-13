import WorkOffer from './workOffer.model.js'

// Crear una nueva oferta de trabajo
export const createWorkOffer = async (req, res) => {
    try {
        const { title, problemDescription, user, status, professional } = req.body

        // Validar que el status sea uno de los valores permitidos
        if (status !== 'ACTIVO' && status !== 'INACTIVO') {
            return res.status(400).send({ msg: 'The status must be ACTIVE or INACTIVE.' })
        }

        const newWorkOffer = new WorkOffer({ title, problemDescription, user, status, professional })

        await newWorkOffer.save()

        res.status(201).json(newWorkOffer)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error creating a job offer.' })
    }
}

// Obtener todas las ofertas de trabajo
export const getWorkOffers = async (req, res) => {
    try {
        const workOffers = await WorkOffer.find().populate('user')
        res.status(200).json(workOffers)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error when listing job offers.' })
    }
}


// Actualizar una oferta de trabajo por ID
export const updateWorkOffer = async (req, res) => {
    try {
        const { id } = req.params
        const { status, ...rest } = req.body

        // Validar que el status sea uno de los valores permitidos
        if (status && status !== 'ACTIVO' && status !== 'INACTIVO') {
            return res.status(400).send({ msg: 'The status must be ACTIVE or INACTIVE.' })
        }

        const updatedWorkOffer = await WorkOffer.findByIdAndUpdate(id, { status, ...rest }, { new: true });
        if (!updatedWorkOffer) return res.status(404).json({ message: 'Work offer not found' })

        res.status(200).json(updatedWorkOffer)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error updating data.' })
    }
};

// Eliminar una oferta de trabajo por ID
export const deleteWorkOffer = async (req, res) => {
    try {
        const { id } = req.params
        const deletedWorkOffer = await WorkOffer.findByIdAndDelete(id)
        if (!deletedWorkOffer) return res.status(404).json({ message: 'Work offer not found.' })
        res.status(200).json({ message: 'Work offer deleted.' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error deleting job offer.' })
    }
}