'use strict'

import express from 'express'

import {
    validateJwt,
} from '../middlewares/validate-jwt.js'

import {
    test,
    register,
    login,
    update,
    deleteU,
    getUser
} from './user.controller.js'

const api = express.Router()

api.get('/test', test)

api.get('/getUser', getUser)
api.put('/updateUser/:id', [validateJwt], update)
api.delete('/deleteUser/:id', [validateJwt], deleteU)

api.post('/register', register)
api.post('/login', login)

export default api