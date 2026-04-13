import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import ingredientesRoutes from './routes/ingredientes/ingredientesRoutes.js';
import path from 'path';

const app = express();
const httpServer = createServer(app);

/* =========================
   SOCKET.IO (FRONT + ESP32)
========================= */
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

/* =========================
   VARIÁVEL GLOBAL
========================= */
let ultimoPeso = 0;

/* =========================
   MIDDLEWARES (ORDEM CERTA)
========================= */
app.use(cors());
app.use(express.json());

// ✅ SERVE O FRONTEND (CAMINHO CORRETO)
app.use(express.static(path.resolve(process.cwd(), 'public')));

// Rotas REST
app.use('/ingredientes', ingredientesRoutes);

// ✅ Fallback explícito para /
app.get('/', (_, res) => {
  res.sendFile(
    path.resolve(process.cwd(), 'public', 'index.html')
  );
});

/* =========================
   SOCKET.IO
========================= */
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  // ESP32 envia peso
  socket.on('peso', (dados) => {
    if (typeof dados?.peso === 'number') {
      ultimoPeso = dados.peso;
      console.log('Peso recebido do ESP32:', ultimoPeso);

      io.emit('atualizarPeso', { peso: ultimoPeso });
    }
  });

  // Frontend pede tara
  socket.on('tara', () => {
    console.log('Comando TARA recebido');
    io.emit('tara');
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

/* =========================
   CONFIRMAR PESAGEM
========================= */
app.post('/balanca/confirmar', (_, res) => {
  if (ultimoPeso <= 0) {
    return res.status(400).json({ erro: 'Peso inválido' });
  }

  console.log('Pesagem confirmada:', ultimoPeso);

  res.json({
    ok: true,
    pesoConfirmado: ultimoPeso
  });
});

/* =========================
   START SERVER
========================= */
httpServer.listen(3000, '0.0.0.0', () => {
  console.log('Servidor rodando em http://0.0.0.0:3000');
});
``