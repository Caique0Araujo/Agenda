const User = require("../models/User");

module.exports = class ValidateService {
  static validatePassword(password, confirmPassord) {
    if (password === confirmPassord) {
      return false;
    } else {
      return true;
    }
  }
  static async validateEmail(email) {
    const dbEmail = await User.findOne({ where: { email: email } });
    if (dbEmail) {
      return true;
    } else {
      return false;
    }
  }
  static async validateObject(object, type) {
    switch (type) {
      case "eventContact": {
        const EventContact = require("../models/Event_Contact");
        const eventContact = await EventContact.findOne({
          raw: true,
          where: {
            Event_eventId: object.Event_eventId,
            Contact_contactId: object.Contact_contactId,
          },
        });
        if (eventContact) {
          return true;
        } else {
          return false;
        }
      }
      case "groupContact": {
        const GroupContact = require("../models/Group_Contact");
        const groupContact = await GroupContact.findOne({
          raw: true,
          where: {
            Group_groupId: object.Group_groupId,
            Contact_contactId: object.Contact_contactId,
          },
        });
        if (groupContact) {
          return true;
        } else {
          return false;
        }
      }
      case "User": {
        const User = require("../models/User");
        const user = await User.findOne({
          raw: true,
          where: { id: object.id },
        });
        if (user) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
};
