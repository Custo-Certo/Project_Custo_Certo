import { Router } from 'express';
import { ingredientesController } from '../../controllers/ingredientesController.js';

const router = Router();

router.post('/', ingredientesController.cadastrar);
router.get('/', ingredientesController.listar);
router.put('/:id', ingredientesController.atualizar);
router.delete('/:id', ingredientesController.deletar); // Agora vai reconhecer!

export default router;
