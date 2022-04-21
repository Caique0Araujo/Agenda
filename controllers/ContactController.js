const Contact = require("../models/Contact");
const ValidateService = require("../services/ValidateService");
module.exports = class ContactController {
  // ADD

  static createContact(req, res) {
    res.render("contacts/addContact");
  }
  static async createContactSave(req, res) {
    const contact = {
      name: req.body.nome,
      fone: req.body.fone,
      email: req.body.email,
      UserId: req.session.userid,
    };

    if (await ValidateService.validateObject({ id: contact.UserId }, "User")) {
      Contact.create(contact)
        .then((result) => {
          if (result) {
            req.flash("message", "Contato adicionado com sucesso");
            req.session.save(() => {
              res.redirect("contacts/");
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      req.flash(
        "message",
        "Erro ao adicionar contato, verifique se está logado!"
      );
      req.session.save(() => {
        res.redirect("contacts/");
      });
      return;
    }
  }

  // EDIT

  static async editContact(req, res) {
    const id = req.params.id;
    const contact = await Contact.findOne({ raw: true, where: { id: id } });

    res.render("contacts/editContact", { contact });
  }

  static async editContactPost(req, res) {
    const id = req.body.id;
    const UserId = req.session.userid;

    const contact = {
      name: req.body.name,
      fone: req.body.fone,
      email: req.body.email,
    };

    if (await ValidateService.validateObject({ id: UserId }, "User")) {
      Contact.update(contact, { where: { id: id } })
        .then((result) => {
          if (result) {
            req.flash("message", "Contato editado com sucesso!");
            req.session.save(() => {
              res.redirect("contacts/");
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      req.flash("message", "Erro ao editar contato, verifique se está logado!");
      req.session.save(() => {
        res.redirect("contacts/");
      });
      return;
    }
  }

  // SHOW

  static async showContacts(req, res) {
    const UserId = req.session.userid;

    try {
      const contacts = await Contact.findAll({
        raw: true,
        where: { UserId: UserId },
      });
      res.render("contacts/contacts", { contacts: contacts });
    } catch (error) {
      console.log(error);
    }
  }
  static async showContact(req, res) {
    const id = req.params.id;

    try {
      const contact = await Contact.findOne({ raw: true, where: { id: id } });
      res.render("contacts/contact", { contact });
    } catch (error) {
      console.log(error);
    }
  }

  // DELETE

  static async deleteContact(req, res) {
    const id = req.body.id;

    Contact.destroy({
      where: { id: id },
    })
      .then((result) => {
        if (result) {
          req.flash("message", "Contato excluido com sucesso");
          req.session.save(() => {
            res.redirect("contacts/");
          });
        }
      })
      .catch((err) => console.log(err));
  }
};
