const express = require('express');
const cors = require('cors');
const app = express();

// middleware: Allow Express to understand JSON that the front-end sends
app.use(cors());
app.use(express.json());

// Test route (to see if it's working)
app.get('/', (req, res) => {
    res.send("API do Sistema de Pesagem Rodando! 🚀");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});