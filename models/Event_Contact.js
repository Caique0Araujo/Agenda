const {DataTypes, sequelize} = require('sequelize')
const db = require('../db/conn')
const Event = require('./Event')
const Contact = require('./Contact')

const Event_Contact = db.define('Event_Contact', {}, { timestamps: false })

Event.belongsToMany(
    Contact, 
    {
        through: Event_Contact,
        foreignKey: 'Event_eventId'
    }
)

Contact.belongsToMany(
    Event,
    {
        through: Event_Contact,
        foreignKey: 'Contact_contactId'
    }
)

await Contact.sync()
await Event.sync()
await Event_Contact.sync()

module.exports = Event_Contact