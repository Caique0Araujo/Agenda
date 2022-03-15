const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Contact = db.define('Contact', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }, email: {
        type: DataTypes.STRING,
        allowNull: true,
        required: false
    }, fone: {
        type: DataTypes.STRING,
        allowNull: true,
        required: false
    },
})

module.exports = Contact
