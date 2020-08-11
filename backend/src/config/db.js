const Sequelize = require("sequelize");
module.exports = new Sequelize({
  dialect: "sqlite",
  storage: "./high-scores.sqlite",
});
