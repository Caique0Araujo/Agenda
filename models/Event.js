const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Event = db.define('Event', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
})

module.exports = Event