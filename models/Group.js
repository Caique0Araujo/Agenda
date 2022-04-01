const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Group = db.define('Group', {
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


module.exports = Group
