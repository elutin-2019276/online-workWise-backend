import { Router } from 'express';
import {
    getEmployer,
    saveEmployer,
    updateEmployer,
    deleteEmployer
} from './employer.controller.js'; // Asegúrate de que el path sea correcto

const api = Router();

api.get('/getEmployer', getEmployer);
api.post('/saveEmployer', saveEmployer);
api.put('/updateEmployer/:id', updateEmployer);
api.delete('/deleteEmployer/:id', deleteEmployer);

export default api;
