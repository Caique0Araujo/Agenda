const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('agenda', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
})

module.exports = sequelize

