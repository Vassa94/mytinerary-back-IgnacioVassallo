import dotenv from 'dotenv'; // Importa la librería dotenv
dotenv.config(); // Carga las variables de entorno desde .env

const config = {
  mongoURI: process.env.MONGO_URI // Usa la variable de entorno
};

export default config;
