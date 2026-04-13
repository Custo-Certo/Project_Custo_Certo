import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { WebSocketServer } from 'ws';
import ingredientesRoutes from './routes/ingredientes/ingredientesRoutes.js';

let ultimoPeso: number = 0;
const app = express();
const httpServer = createServer(app);

/* =========================
   SOCKET.IO (FRONTEND)
========================= */
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

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

wss.on('connection', (ws) => {
  console.log('ESP32 conectado via WebSocket');

  ws.on('message', (message) => {
    try {
      const dados = JSON.parse(message.toString());

      console.log('Peso recebido do ESP32:', dados.peso);

      // Repassa para todos os frontends
      io.emit('atualizarPeso', dados);

    } catch (err) {
      console.error('Erro ao processar mensagem do ESP32:', err);
    }
  });

  ws.on('close', () => {
    console.log('ESP32 desconectado');
  });
});

/* =========================
   INICIAR SERVIDOR
========================= */
httpServer.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
``

// Endpoint para tarar a balança

app.post('/balanca/tara', (_, res) => {
  if (wss.clients.size === 0) {
    return res.status(503).json({ erro: 'ESP32 não conectado' });
  }

  // Envia comando para todos os ESP32 conectados
  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // OPEN
      client.send(JSON.stringify({ comando: 'tara' }));
    }
  });

  res.json({ ok: true });
});

// Endpoint para confirmar a pesagem

app.post('/balanca/confirmar', (_, res) => {
  if (ultimoPeso <= 0) {
    return res.status(400).json({ erro: 'Peso inválido' });
  }

  // Futuro: aqui você vai abater do estoque, salvar histórico etc.
  console.log('Pesagem confirmada:', ultimoPeso);

  res.json({
    ok: true,
    pesoConfirmado: ultimoPeso
  });
});