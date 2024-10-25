const { Router } = require("express");
const adminController = require("../controllers/adminController");
const { validateAdmin, validateAdminId } = require("../middlewares/validateAdmin");

const router = Router();

router.post("/", validateAdmin, adminController.create);

router.put("/:id", validateAdmin, validateAdminId, adminController.update);

router.put(
  "/esqueciSenha/:id",
  validateAdmin,
  validateAdminId,
  adminController.esqueciSenha
);

router.delete("/:id", validateAdminId, adminController.delete);

router.get("/:id", validateAdminId, adminController.getOne);

router.get("/", adminController.getAll);

router.post("/login", adminController.login);

module.exports = router;
