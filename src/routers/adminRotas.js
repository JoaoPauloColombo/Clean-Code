const { Router } = require("express");
const adminController = require('../controllers/adminController');
const { validateAdmin, validateAdminId } = require("../middlewares/validateAdmin");
const router = Router();

router.post('/',validateAdmin, adminController.create ); // funcao de criar

// funcao de editar
router.put('/:id', validateAdmin,validateAdminId, adminController.update ); // parametro id

router.put('/:id', validateAdmin,validateAdminId, adminController.esqueciSenha ); // parametro id


// funcao de deletar
router.delete('/:id',validateAdminId, adminController.delete ); // parametro id

// funcao buscar unico
router.get('/:id',validateAdminId, adminController.getOne ); // parametro id

router.get('/', adminController.getAll ); // funcao buscar todos 

module.exports = router;