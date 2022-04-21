const Group = require("../models/Group");
const GroupContactController = require("../controllers/GroupContactController");
const ValidateService = require("../services/ValidateService");
module.exports = class GroupController {
  // Add

  static createGroup(req, res) {
    res.render("groups/addGroup");
  }
  static async createGroupSave(req, res) {
    console.log(req.body);

    const group = {
      name: req.body.name,
      description: req.body.description,
      UserId: req.session.userid,
    };

    if (await ValidateService.validateObject({ id: group.UserId }, "User")) {
      Group.create(group)
        .then((result) => {
          if (result) {
            req.flash("message", "Grupo adicionado com sucesso!");
            req.session.save(() => {
              res.redirect("groups/");
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      req.flash(
        "message",
        "Erro ao adicionar grupo, verifique se está logado!"
      );
      req.session.save(() => {
        res.redirect("groups/");
      });
    }
  }

  // EDIT

  static async editGroup(req, res) {
    const id = req.params.id;
    const group = await Group.findOne({ raw: true, where: { id: id } });

    res.render("groups/editGroup", { group });
  }
  static async editGroupPost(req, res) {
    const id = req.body.id;
    const UserId = req.session.userid;

    const group = {
      name: req.body.name,
      description: req.body.description,
    };

    if (await ValidateService.validateObject({ id: UserId }, "User")) {
      Group.update(group, { where: { id: id } })
        .then((result) => {
          if (result) {
            req.flash("message", "Grupo editado com sucesso!");
            req.session.save(() => {
              res.redirect("groups/");
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      req.flash("message", "Erro ao editar grupo, verifique se está logado!");
      req.session.save(() => {
        res.redirect("groups/");
      });
    }
  }

  // SHOW

  static async showGroups(req, res) {
    const UserId = req.session.userid;

    try {
      const groups = await GroupContactController.showGroupsContacts(UserId);
      res.render("groups/groups", { groups: groups });
    } catch (error) {
      console.log(error);
    }
  }

  static async showGroup(req, res) {
    const id = req.params.id;
    const userid = req.session.userid;

    try {
      const group = await GroupContactController.showGroupContacts(id, userid);
      res.render("groups/group", { group });
    } catch (error) {
      console.log(error);
    }
  }

  // DELETE

  static async deleteGroup(req, res) {
    const id = req.body.id;

    Group.destroy({ where: { id: id } })
      .then((result) => {
        if (result) {
          req.flash("message", "Grupo excluido com sucesso!");
          req.session.save(() => {
            res.redirect("groups/");
          });
        }
      })
      .catch((err) => console.log(err));
  }
};
