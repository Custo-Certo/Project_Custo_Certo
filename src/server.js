const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Importa o arquivo de rotas
const rotasIngredientes = require('./routes/ingredientes/ingredientesRoutes');

// Avisa o Express para usar essas rotas sempre que a URL começar com /ingredientes
app.use('/ingredientes', rotasIngredientes);

// Liga o Servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000 com Banco em Memória!");
});