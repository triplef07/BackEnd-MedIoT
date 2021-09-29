const { Sequelize, DataTypes } = require("sequelize");
const db = require("../database/config.js");

const Data_Sensor = db.define(
  "Data_Sensor",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      auto_increment: true,
      primaryKey: true,
    },
    temp: {
      type: DataTypes.FLOAT,
      // allowNull defaults to true
    },
    ppg: {
      type: DataTypes.FLOAT,
      // allowNull defaults to true
    },
    ekg: {
      type: DataTypes.FLOAT,
      // allowNull defaults to true
    },
    nivac: {
      type: DataTypes.FLOAT,
      // allowNull defaults to true
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
    tableName: "data_sensor",
    createdAt: "createdDate",
    updatedAt: "updatedDate",
  }
);

module.exports = Data_Sensor;
