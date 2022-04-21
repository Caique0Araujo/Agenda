const Group = require("../models/Group");
const Contact = require("../models/Contact");
const Group_Contact = require("../models/Group_Contact");
const ValidateService = require("../services/ValidateService");

module.exports = class GroupContactController {
  // ADD

  static async addContact(req, res) {
    const id = req.params.id;
    const userid = req.session.userid;
    const group = await Group.findOne({
      raw: true,
      where: { id: id, UserId: userid },
    });
    const contacts = await Contact.findAll({
      raw: true,
      where: { UserId: userid },
    });

    res.render("Groups_contacts/addContact", { group, contacts });
  }

  static async addContactSave(req, res) {
    const contacts = req.body.contact;
    const Group_groupId = req.body.group;
    const UserId = req.session.userid;
    var cont = 0;

    if (Array.isArray(contacts)) {
      await contacts.forEach(async function (Contact_contactId) {
        if (
          (await ValidateService.validateObject(
            { Group_groupId, Contact_contactId },
            "groupContact"
          )) === false
        )
          await Group_Contact.create({
            Group_groupId,
            Contact_contactId,
            UserId,
          });
      });
    } else {
      if (
        await ValidateService.validateObject(
          { Group_groupId, Contact_contactId: contacts },
          "groupContact"
        )
      ) {
        req.flash("message", "Contato já está cadastrado no grupo");
      } else {
        await Group_Contact.create({
          Group_groupId,
          Contact_contactId: contacts,
          UserId,
        });
      }
    }

    req.session.save(() => {
      res.redirect("/groups/groups");
    });
  }

  // SHOW

  static async showGroupsContacts(userid) {
    const groups = await Group.findAll({
      include: Contact,
      where: {
        UserId: userid,
      },
    });

    if (groups) {
      const contact = JSON.parse(JSON.stringify(groups, null, 2));
      return contact;
    } else {
      return null;
    }
  }

  static async showGroupContacts(id, userid) {
    const group = await Group.findByPk(id, {
      include: Contact,
      where: {
        UserId: userid,
      },
    });
    if (group) {
      const contact = JSON.parse(JSON.stringify(group));
      return contact;
    } else {
      return null;
    }
  }

  // DELETE

  static async editContacts(req, res) {
    const id = req.params.id;
    const userid = req.session.userid;
    const group = await Group.findByPk(id, {
      include: Contact,
      where: {
        UserId: userid,
      },
    });
    if (group) {
      const groups = JSON.parse(JSON.stringify(group));
      res.render("groups_contacts/editContacts", { groups: groups });
    } else {
      res.render("groups_contacts/editContacts");
    }
  }

  static async removeContact(req, res) {
    const Group_groupId = req.body.idGroup;
    const contacts = req.body.contacts;

    if (Array.isArray(contacts)) {
      await contacts.forEach(async (Contact_contactId) => {
        await Group_Contact.destroy({
          where: {
            Group_groupId: Group_groupId,
            Contact_contactId: Contact_contactId,
          },
        });
      });
      req.flash("message", "Contatos removidos com sucesso!");
    } else {
      await Group_Contact.destroy({
        where: { Group_groupId: Group_groupId, Contact_contactId: contacts },
      });
      req.flash("message", "Contato removido com sucesso!");
    }

    req.session.save(() => {
      res.redirect("/groups/groups");
    });
  }
};
