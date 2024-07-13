import { initServer } from "./configs/app.js";
import { connect } from "./configs/mongo.js"; 
import { userDefect } from './src/user/user.controller.js';

const startApp = async () => {
    try {
        // Inicializar servidor
        initServer();

        // Conectar a MongoDB
        await connect();

        // Crear usuario por defecto
        const userDefectResult = await userDefect();
        console.log(userDefectResult);

        console.log('App initialized successfully');
    } catch (err) {
        console.error('Failed to start app', err);
        process.exit(1); // Terminar el proceso en caso de fallo crítico
    }
};

startApp();