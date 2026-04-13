import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { WebSocketServer } from 'ws';
import ingredientesRoutes from './routes/ingredientes/ingredientesRoutes.js';
import path from 'path';

const app = express();
const httpServer = createServer(app);

/* =========================
   SOCKET.IO (FRONTEND)
========================= */
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

/* =========================
   VARIÁVEL GLOBAL
========================= */
let ultimoPeso = 0;

/* =========================
   MIDDLEWARES
========================= */
app.use(cors());
app.use(express.json());
app.use('/ingredientes', ingredientesRoutes);

/* =========================
   SOCKET.IO - FRONTEND
========================= */
io.on('connection', (socket) => {
  console.log('Frontend conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('Frontend desconectado:', socket.id);
  });
});

/* =========================
   WEBSOCKET PURO - ESP32
========================= */
const wss = new WebSocketServer({
  server: httpServer,
  path: '/peso'
});

console.log('WebSocket /peso inicializado');


wss.on('connection', (ws, req) => {
  console.log('ESP32 conectado via WebSocket');
  console.log('IP do ESP32:', req.socket.remoteAddress);

  // ✅ AQUI É O TRECHO DA IMAGEM
  ws.on('message', (message) => {
    try {
      const dados = JSON.parse(message.toString());

      if (typeof dados.peso === 'number') {
        ultimoPeso = dados.peso;

        console.log('Peso atualizado:', ultimoPeso);

        // Envia ao frontend em tempo real
        io.emit('atualizarPeso', { peso: ultimoPeso });
      }
    } catch (err) {
      console.error('Erro ao processar mensagem do ESP32', err);
    }
  });

  ws.on('close', () => {
    console.log('ESP32 desconectado');
  });
});

/* =========================
   ENDPOINT: TARAR BALANÇA
========================= */
app.post('/balanca/tara', (_, res) => {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify({ comando: 'tara' }));
    }
  });

  res.json({ ok: true });
});

/* =========================
   ENDPOINT: CONFIRMAR PESAGEM
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

app.use(express.static(path.resolve('public')));
