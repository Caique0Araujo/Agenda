const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Group = require('./Group')

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

Contact.belongsToMany(
    Group,
    {
        through: 'Contact_Group',
        foreignKey: 'Contact_contactId'
    }
)

Group.belongsToMany(
    Contact, 
    {
        through: 'Contact_Group',
        foreignKey: 'Group_groupId'
    }
)

module.exports = Contact
