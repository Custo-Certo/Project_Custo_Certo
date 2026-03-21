const express = require('express');
const router = express.Router();

// Importa no Controller
const ingredientesController = require('../../controllers/ingredientesController');

// Define os caminhos e qual função do controller 
router.post('/', ingredientesController.cadastrar);
router.get('/', ingredientesController.listar);
router.put('/:id', ingredientesController.atualizar);
router.delete('/:id', ingredientesController.deletar);

module.exports = router;