import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';
import dns from 'node:dns/promises';

const PORT = process.env.PORT || 3000;

async function start() {
  if (!process.env.MONGO_URI) {
    throw new Error('Falta MONGO_URI en el archivo .env');
  }

  if (process.env.DNS_SERVERS) {
    dns.setServers(process.env.DNS_SERVERS.split(','));
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB Atlas conectado');

  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
}

start().catch((error) => {
  console.error('No se pudo iniciar el servidor:', error.message);
  process.exit(1);
});