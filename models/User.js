const { DataTypes} = require('sequelize')
const db = require('../db/conn')
const Contact = require('./Contact')
const Event = require('./Event')
const Group = require('./Group')
const Group_Contact = require('./Group_Contact')
const Evento_Contact = require('./Event_Contact')

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    fone: {
        type: DataTypes.INTEGER,
        required: false,
        allowNull: false

    },
    email: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false

    },
    password: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    }
})

Contact.belongsTo(User)
User.hasMany(Contact)

Event.belongsTo(User)
User.hasMany(Event)

Group.belongsTo(User)
User.hasMany(Group)

Group_Contact.belongsTo(User)
User.hasMany(Group_Contact)

Evento_Contact.belongsTo(User)
User.hasMany(Evento_Contact)

module.exports = User