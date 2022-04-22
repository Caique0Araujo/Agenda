const express = require("express");
const router = express.Router();
const checkAuth = require("../services/AuthenticateService").checkAuth;

const EventContactController = require("../controllers/EventContactController");

router.get("/addContact/:id", checkAuth, EventContactController.addContact);
router.post("/addContact", checkAuth, EventContactController.addContactSave);
router.get("/editContacts/:id", checkAuth, EventContactController.editContacts);
router.post("/removeContacts/", checkAuth, EventContactController.removeContact);

module.exports = router;
