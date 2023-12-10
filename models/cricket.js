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
//   matches: Sequelize.STRING,
//   fifties: Sequelize.STRING,
//   centuries: Sequelize.STRING,
//   wickets: Sequelize.STRING,
//   average: Sequelize.STRING,
});

module.exports = Cricket;
