import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API de usuarios funcionando' });
});

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use((error, req, res, next) => {
  if (error.code === 11000) {
    return res.status(409).json({ message: 'El correo ya está registrado' });
  }

  if (
    error.name === 'ValidationError' ||
    error.name === 'CastError' ||
    error.type === 'entity.parse.failed'
  ) {
    return res.status(400).json({ message: 'Datos o identificador inválidos' });
  }

  console.error(error);
  res.status(500).json({ message: 'Error interno del servidor' });
});

export default app;