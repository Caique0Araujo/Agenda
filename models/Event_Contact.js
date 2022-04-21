const { DataTypes, sequelize } = require("sequelize");
const db = require("../db/conn");
const Event = require("./Event");
const Contact = require("./Contact");

const Event_Contact = db.define(
  "Event_Contact",
  {
    Event_eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: Event,
        key: "id",
      },
    },
    Contact_contactId: {
      type: DataTypes.INTEGER,
      references: {
        model: Contact,
        key: "id",
      },
    },
  },
  { timestamps: false }
);

Event.belongsToMany(Contact, {
  through: Event_Contact,
  foreignKey: "Event_eventId",
});

Contact.belongsToMany(Event, {
  through: Event_Contact,
  foreignKey: "Contact_contactId",
});

module.exports = Event_Contact;
