'use strict'

import { Router } from 'express';
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'

import {
    getProfession,
    saveProfession,
    updateProfession,
    deleteProfession
} from './profession.controller.js'

const api = Router()


api.get('/getProfession', getProfession)

api.post('/saveProfession', [], saveProfession)
api.put('/updateProfession/:id', [validateJwt, isAdmin], updateProfession)
api.delete('/deleteProfession/:id', [validateJwt, isAdmin], deleteProfession)

export default api