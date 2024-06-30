import { Router } from "express" 
import { login, register, test } from './user.controller.js'

const api = Router() 

api.post('/register', register) 
api.post('/test', test)
api.post('/login', login)

export default api 