const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Cricket = sequelize.define('cricket', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  dob: Sequelize.STRING,
  photo: Sequelize.STRING,
  career: Sequelize.TEXT,
//   matches: Sequelize.INTEGER,
//   fifties: Sequelize.INTEGER,
//   centuries: Sequelize.INTEGER,
//   wickets: Sequelize.INTEGER,
//   average: Sequelize.DOUBLE,
});
// sequelize.sync()

module.exports = Cricket;
