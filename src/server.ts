import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';
import ingredientesRoutes from './routes/ingredientes/ingredientesRoutes.js';

const app = express(); // Sem o .default()
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.use(cors()); // Sem o .default()
app.use(express.json()); // Sem o .default()
