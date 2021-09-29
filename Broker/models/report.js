const { Sequelize, DataTypes } = require("sequelize");
const db = require("../database/config.js");

const Report = db.define(
  "Report",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      auto_increment: true,
      primaryKey: true,
    },
    temp_avg: {
      type: DataTypes.FLOAT,
      // allowNull defaults to true
    },
    temp_min: {
      type: DataTypes.FLOAT,
      // allowNull defaults to true
    },
    temp_max: {
      type: DataTypes.FLOAT,
      // allowNull defaults to true
    },
    ppg_avg: {
      type: DataTypes.FLOAT,
      // allowNull defaults to true
    },
    ppg_min: {
      type: DataTypes.FLOAT,
      // allowNull defaults to true
    },
    ppg_max: {
      type: DataTypes.FLOAT,
      // allowNull defaults to true
    },
    ekg_avg: {
      type: DataTypes.FLOAT,
      // allowNull defaults to true
    },
    ekg_min: {
      type: DataTypes.FLOAT,
      // allowNull defaults to true
    },
    ekg_max: {
      type: DataTypes.FLOAT,
      // allowNull defaults to true
    },
    nivac_avg: {
      type: DataTypes.FLOAT,
      // allowNull defaults to true
    },
    nivac_min: {
      type: DataTypes.FLOAT,
      // allowNull defaults to true
    },
    nivac_max: {
      type: DataTypes.FLOAT,
      // allowNull defaults to true
    },
    tag: {
      type: DataTypes.STRING,
    },
    createdDate: {
      type: DataTypes.DATE,
    },
    updatedDate: {
      type: DataTypes.DATE,
    },
    listAlatId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    // Other model options go here
    tableName: "report",
    createdAt: "createdDate",
    updatedAt: "updatedDate",
  }
);

module.exports = Report;
