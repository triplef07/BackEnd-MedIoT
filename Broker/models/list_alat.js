const { Sequelize, DataTypes } = require("sequelize");
const db = require("../database/config.js");

const List_Alat = db.define(
  "List_Alat",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      auto_increment: true,
      primaryKey: true,
    },
    lokasi: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    pasien: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    tableName: "list_alat",
    timestamps: false,
  }
);

module.exports = List_Alat;
