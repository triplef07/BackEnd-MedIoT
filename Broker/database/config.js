const { Sequelize } = require("sequelize");

const db = new Sequelize("mediot_v1", "root", "wisokto2021", {
  dialect: "mysql",
  host: "database",
  port: 3306,
});

module.exports = db;
