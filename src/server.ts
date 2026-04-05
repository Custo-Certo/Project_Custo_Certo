import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import ingredientesRoutes from './routes/ingredientes/ingredientesRoutes.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Controle de Estoque',
      version: '1.0.0',
      description: 'API para gerenciamento de ingredientes e custos',
    },
  },
  apis: ['src/routes/**/*.ts'], // caminho das rotas
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// CONECTA AS ROTAS
app.use('/ingredientes', ingredientesRoutes);

// INICIA O SERVIDOR
httpServer.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});