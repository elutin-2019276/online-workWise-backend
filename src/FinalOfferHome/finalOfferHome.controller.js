import FinalOfferHome from './finalOfferHome.model.js'

export const createFinalOfferHome = async (req, res) => {
    try {
        const { workOffer, workSite, price, user, status } = req.body;

        // Validar que el status sea uno de los valores permitidos
        if (status !== 'ACTIVO' && status !== 'INACTIVO') {
            return res.status(400).send({ msg: 'El status debe ser ACTIVO o INACTIVO' });
        }

        const newFinalOfferHome = new FinalOfferHome({
            workOffer,
            workSite,
            price,
            user,
            status
        });

        await newFinalOfferHome.save();
        res.status(201).json(newFinalOfferHome);
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error al crear una oferta final de trabajo en casa' })
    }
}

// Obtener todas las ofertas finales de trabajo en casa
export const getFinalOfferHomes = async (req, res) => {
    try {
        const finalOfferHomes = await FinalOfferHome.find().populate('workOffer').populate('user')
        res.status(200).json(finalOfferHomes)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error al listar las ofertas finales de trabajo en casa' })
    }
}

// Obtener una oferta final de trabajo en casa por ID
export const getFinalOfferHomeById = async (req, res) => {
    try {
        const { id } = req.params
        const finalOfferHome = await FinalOfferHome.findById(id).populate('workOffer').populate('user')
        if (!finalOfferHome) return res.status(404).json({ message: 'Final offer home not found' })
        res.status(200).json(finalOfferHome)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error al obtener la oferta final de trabajo en casa' })
    }
}

// Actualizar una oferta final de trabajo en casa por ID
export const updateFinalOfferHome = async (req, res) => {
    try {
        const { id } = req.params
        const updatedFinalOfferHome = await FinalOfferHome.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatedFinalOfferHome) return res.status(404).json({ message: 'Final offer home not found' })
        res.status(200).json(updatedFinalOfferHome)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error al actualizar la oferta final de trabajo en casa' })
    }
}

// Eliminar una oferta final de trabajo en casa por ID
export const deleteFinalOfferHome = async (req, res) => {
    try {
        const { id } = req.params
        const deletedFinalOfferHome = await FinalOfferHome.findByIdAndDelete(id)
        if (!deletedFinalOfferHome) return res.status(404).json({ message: 'Final offer home not found' })
        res.status(200).json({ message: 'Final offer home deleted' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error al eliminar la oferta final de trabajo en casa' })
    }
}