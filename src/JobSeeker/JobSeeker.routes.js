'use strict' 

import {Router} from "express"
import {save, get, deleteJob, update} from './JobSeeker.controller.js'
import upload  from "../../configs/multer.js"
const api = Router ()

//api.post('/save', upload.single('curriculumVitae'),('photo'), save)
api.post('/save', upload.single('curriculumVitae'), save)

api.get('/get', get)
api.delete('/delete/:id', deleteJob)
api.put('/update/:id', update)


export default api