const Event = require("../models/Event");
const DateService = require("../services/DateService");
const ValidateService = require("../services/ValidateService");
const EventContactController = require("../controllers/EventContactController");

module.exports = class EventController {
  // ADD

  static createEvent(req, res) {
    res.render("events/addEvent");
  }
  static async createEventSave(req, res) {
    const event = {
      name: req.body.name,
      description: req.body.description,
      eventDate: req.body.date,
      UserId: req.session.userid,
    };

    if (await ValidateService.validateObject({ id: event.UserId }, "User")) {
      Event.create(event)
        .then((result) => {
          if (result) {
            req.flash("message", "Evento adicionado com sucesso");
            req.session.save(() => {
              res.redirect("events/");
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      req.flash(
        "message",
        "Erro ao adicionar evento, verifique se está logado!"
      );
      req.session.save(() => {
        res.redirect("events/");
      });
      return;
    }
  }

  // EDIT

  static async editEvent(req, res) {
    const id = req.params.id;
    const event = await Event.findOne({ raw: true, where: { id: id } });
    event.eventDate = DateService.formateDateForm(event.eventDate, true);
    res.render("events/editEvent", { event });
  }

  static async editEventPost(req, res) {
    const id = req.body.id;
    const UserId = req.session.userid;

    const event = {
      name: req.body.name,
      description: req.body.description,
      eventDate: req.body.date,
    };

    if (await ValidateService.validateObject({ id: UserId }, "User")) {
      Event.update(event, { where: { id: id } })
        .then((result) => {
          if (result) {
            req.flash("message", "Evento editado com sucesso");
            req.session.save(() => {
              res.redirect("events/");
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      req.flash("message", "Erro ao editar evento, verifique se está logado!");
      req.session.save(() => {
        res.redirect("events/");
      });
      return;
    }
  }

  // SHOW

  static async showEvents(req, res) {
    const UserId = req.session.userid;

    try {
      const events = await EventContactController.showEventsContacts(UserId);
      events.forEach((event) => {
        if (event.eventDate != null) {
          event.eventDate = DateService.formatDate(event.eventDate, false);
        }
      });

      res.render("events/events", { events: events });
    } catch (error) {
      console.log(error);
    }
  }

  static async showEvent(req, res) {
    const id = req.params.id;
    const userid = req.session.userid;

    try {
      const event = await EventContactController.showEventContacts(id, userid);
      event.eventDate = DateService.formatDate(event.eventDate, false);

      res.render("events/event", { event: event });
    } catch (error) {
      console.log(error);
    }
  }

  // DELETE

  static async deleteEvent(req, res) {
    const id = req.body.id;

    Event.destroy({
      where: { id: id },
    })
      .then((result) => {
        if (result) {
          req.flash("message", "Evento excluido com sucesso!");
          req.session.save(() => {
            res.redirect("events/");
          });
        }
      })
      .catch((err) => console.log(err));
  }
};
