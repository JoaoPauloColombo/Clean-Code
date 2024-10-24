const Admin = require("../models/admin");
const adminService = require("../services/AdminService");
const jwt = require("jsonwebtoken");

const adminController = {
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      const admin = await Admin.findOne({ where: { email } });

      if (!admin) {
        return res.status(400).json({
          msg: "Email ou senha incorretos",
        });
      }

      const isValida = await bcrypt.compare(senha, admin.senha);
      if (!isValida) {
        return res.status(400).json({
          msg: "Email ou senha incorretos",
        });
      }

      const token = jwt.sign(
        { email: admin.email, nome: admin.nome },
        process.env.SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        msg: "Login realizado",
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o suporte" });
    }
  },
  create: async (req, res) => {
    try {
      const admin = await adminService.create(req.body);

      return res.status(201).json({
        msg: "Usuario criado com sucesso",
        admin,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro ao tentar criar o Usuario",
      });
    }
  },
  esqueciSenha: async (req, res) => {
    try {
      const admin = await adminService.esqueciSenha(req.params.id, req.body);
      if (!admin) {
        return res.status(400).json({
          msg: "Admin nao encontrado",
        });
      }
      return res.status(200).json({
        msg: "Senha do admin foi atualizada com sucesso",
        admin,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro ao atualizar o Admin",
      });
    }
  },

  update: async (req, res) => {
    try {
      const admin = await adminService.update(req.params.id, req.body);
      if (!admin) {
        return res.status(400).json({
          msg: "Admin nao encontrado",
        });
      }
      return res.status(200).json({
        msg: "Admin atualizado com sucesso",
        admin,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro ao atualizar o Admin",
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const admins = await adminService.getAll();
      return res.status(200).json({
        msg: "Todos os admins!",
        admins,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro no Servidor",
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const admin = await adminService.getById(req.params.id);
      if (!admin) {
        return res.status(400).json({
          msg: "Admin nao encontrado!",
        });
      }
      return res.status(200).json({
        msg: "Admin encontrado!",
        admin,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro no Servidor",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const admin = await adminService.delete(req.params.id);
      if (!admin) {
        return res.status(400).json({
          msg: "Admin nao encontrado!",
        });
      }
      return res.status(200).json({
        msg: "Admin deletado com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro no Servidor",
      });
    }
  },
};

module.exports = adminController;
