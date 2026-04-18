import express from 'express';
import cors from 'cors';
import path from 'path';
import ingredientesRoutes from './routes/ingredientes/ingredientesRoutes.js';

const app = express();

/* =========================
   ESTADO GLOBAL DA BALANÇA
========================= */
let ultimoPeso = 0;
let precisaTarar = false;

/* =========================
   MIDDLEWARES
========================= */
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(process.cwd(), 'public')));

/* =========================
   ROTAS DE INGREDIENTES
========================= */
app.use('/ingredientes', ingredientesRoutes);

/* =========================
   BALANÇA (HTTP)
========================= */

// ESP32 envia peso
app.post('/balanca/peso', (req, res) => {
  const { peso } = req.body;
  if (typeof peso === 'number') {
    ultimoPeso = peso;
    console.log('⚖️ Peso recebido:', ultimoPeso);
  }
  res.json({ ok: true });
});

// Frontend lê peso
app.get('/balanca/peso', (_, res) => {
  res.json({ peso: ultimoPeso });
});

// Frontend pede tara
app.post('/balanca/tara', (_, res) => {
  precisaTarar = true;
  res.json({ ok: true });
});

// ESP32 verifica tara
app.get('/balanca/tara', (_, res) => {
  res.json({ tarar: precisaTarar });
  precisaTarar = false;
});

// Confirmar pesagem
app.post('/balanca/confirmar', (_, res) => {
  if (ultimoPeso <= 0) {
    return res.status(400).json({ erro: 'Peso inválido' });
  }

  res.json({
    ok: true,
    pesoConfirmado: ultimoPeso
  });
});

/* =========================
   FRONTEND
========================= */
app.get('/', (_, res) => {
  res.sendFile(path.resolve(process.cwd(), 'public', 'index.html'));
});

/* =========================
   START
========================= */
app.listen(3000, '0.0.0.0', () => {
  console.log('🚀 Servidor rodando em http://0.0.0.0:3000');
});