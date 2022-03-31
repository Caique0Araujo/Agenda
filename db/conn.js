const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('agenda', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize

