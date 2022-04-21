const { DataTypes, sequelize } = require("sequelize");
const db = require("../db/conn");
const Group = require("./Group");
const Contact = require("./Contact");

const Group_Contact = db.define(
  "Group_Contact",
  {
    Group_groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: Group,
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

Group.belongsToMany(Contact, {
  through: "Group_Contact",
  foreignKey: "Group_groupId",
});

Contact.belongsToMany(Group, {
  through: "Group_Contact",
  foreignKey: "Contact_contactId",
});

module.exports = Group_Contact;
