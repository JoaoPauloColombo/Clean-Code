const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
// Definindo o modelo
const Admin = sequelize.define(
  "Admin",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // E-mail Unico
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Timestamps, para armazenar a hora que foi criado
  }
);

module.exports = Admin;
