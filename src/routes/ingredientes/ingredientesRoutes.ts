import { Router } from 'express';
import { ingredientesController } from '../../controllers/ingredientesController.js';

const router = Router();

router.get('/', ingredientesController.listar);
router.post('/', ingredientesController.cadastrar);
router.delete('/:id', ingredientesController.deletar);

export default router;