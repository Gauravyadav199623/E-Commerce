const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'mysqlpassword', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
