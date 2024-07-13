import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true // Asegura que los nombres de usuario sean únicos
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    locality: {
        type: String,
        required: false
    },
    profession: {
        type: String,
        enum: ['Maestro', 'Programador', 'Arquitecto', 'Plumero', 'Mecánico', 'Administrador'], // Añadir 'Administrador' aquí
        required: true
    },
    role: {
        type: String,
        enum: ['Empleador', 'Solicitante de empleo', 'Admin'],
        required: true
    }
});

export default mongoose.model('User', userSchema);
