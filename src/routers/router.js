const { Router } = require("express");
const userRoutes = require("./usuarioRotas")
const adminRoutes = require("./adminRotas")
const AdminController = require("../controllers/adminController")

const router = Router();

router.use('/user', userRoutes);
router.use('/admin', adminRoutes);

router.post ('/login', (req,res) =>{
    AdminController.login(req,res)
});


module.exports = router;