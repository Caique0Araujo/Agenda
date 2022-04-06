const {DataTypes, sequelize} = require('sequelize')
const db = require('../db/conn')
const Contact = require('../models/Contact')

const Event = db.define('Event', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        require: false
    },
    eventDate: {
        type: DataTypes.DATE,
        allowNull: true,
        require: false,

    },
})


Event.belongsToMany(
    Contact, 
    {
        through: 'Event_Contact',
        foreignKey: 'Event_eventId'
    }
)

Contact.belongsToMany(
    Event,
    {
        through: 'Event_Contact',
        foreignKey: 'Contact_contactId'
    }
)



module.exports = Event