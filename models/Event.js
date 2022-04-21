const { DataTypes, sequelize } = require("sequelize");
const db = require("../db/conn");

const Event = db.define("Event", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    require: false,
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: true,
    require: false,
  },
});

module.exports = Event;
