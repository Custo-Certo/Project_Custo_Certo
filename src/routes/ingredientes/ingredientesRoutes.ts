import { Router } from 'express';
import { ingredientesController } from '../../controllers/ingredientesController.js';

const router = Router();

/**
 * @swagger
 * /ingredientes:
 *   post:
 *     summary: Cadastra um ingrediente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nome: Farinha
 *             unidade: kg
 *             preco: 10
 *     responses:
 *       201:
 *         description: Ingrediente criado
 */
router.post('/', ingredientesController.cadastrar);

/**
 * @swagger
 * /ingredientes:
 *   get:
 *     summary: Lista todos os ingredientes
 *     responses:
 *       200:
 *         description: Lista de ingredientes
 */
router.get('/', ingredientesController.listar);

/**
 * @swagger
 * /ingredientes/{id}:
 *   put:
 *     summary: Atualiza um ingrediente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Ingrediente atualizado
 */
router.put('/:id', ingredientesController.atualizar);

/**
 * @swagger
 * /ingredientes/{id}:
 *   delete:
 *     summary: Deleta um ingrediente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Ingrediente deletado
 */
router.delete('/:id', ingredientesController.deletar);

export default router;