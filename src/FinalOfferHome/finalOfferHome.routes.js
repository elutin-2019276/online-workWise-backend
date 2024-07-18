import { Router } from "express"
import {
    createFinalOfferHome,
    deleteFinalOfferHome,
    getFinalOfferHomeById,
    getFinalOfferHomes,
    updateFinalOfferHome
} from "./finalOfferHome.controller.js"

const api = Router()

api.post('/createFinalOfferHome', createFinalOfferHome)
api.put('/updateFinalOfferHome/:id', updateFinalOfferHome)
api.delete('/deleteFinalOfferHome/:id', deleteFinalOfferHome)
api.get('/getFinalOfferHomes', getFinalOfferHomes)
api.get('/getFinalOfferHomeById', getFinalOfferHomeById)

export default api