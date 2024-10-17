const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");

const adminService = {
  create: async (req, res) => {
    try {
      const { nome, senha, email } = req.body;

      const hashSenha = await bcrypt.hash(senha, 10);

      return await Admin.create({ nome, senha: hashSenha, email });

    } catch (error) {
      throw new Error("Ocorreu um erro ao criar Admin");
    }
  },
  esqueciSenha: async (id, novaSenha) => {
    try {
      const admin = await Admin.findByPk(id);
      if (!admin) {
        return null;
      }
      await admin.update({ senha: novaSenha });
      return admin;
    } catch (error) {
      throw new Error("Ocorreu um erro ao trocar a senha do Admin");
    }
  },
  update: async (id, adminToUpdate) => {
    try {
      const admin = await Admin.findByPk(id);
      if (!admin) {
        return null;
      }
      await admin.update(adminToUpdate);
      await admin.save();
      return admin;
    } catch (error) {
      throw new Error("Ocorreu um erro ao atualizar Admin");
    }
  },
  getById: async (id) => {
    try {
      const admin = await Admin.findByPk(id);
      if (!admin) {
        return null;
      }
      return admin;
    } catch (error) {
      throw new Error("Ocorreu um erro ao buscar unico Admin");
    }
  },
  getAll: async () => {
    try {
      return await Admin.findAll();
    } catch (error) {
      throw new Error("Ocorreu um erro ao buscar todos Admin");
    }
  },
  delete: async (id) => {
    try {
      const admin = await Admin.findByPk(id);
      if (!admin) {
        return null;
      }
      await admin.destroy();
      return admin;
    } catch (error) {
      throw new Error("Ocorreu um erro ao deletar o Admin");
    }
  },
};

module.exports = adminService;
