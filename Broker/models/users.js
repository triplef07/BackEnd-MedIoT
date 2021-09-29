const { Sequelize, DataTypes } = require("sequelize");
const db = require("../database/config.js");

const User = db.define(
  "User",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      auto_increment: true,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    tableName: "user",
    timestamps: false,
  }
);

module.exports = User;
// `sequelize.define` also returns the model
// console.log(User === db.models.User); // true

// const kanye = User.build({
//   user: "808s & Heartbreak",
//   password: "2008",
// });

// async function save() {
//   await kanye.save();
// }

// save();
