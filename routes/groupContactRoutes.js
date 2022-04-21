const express = require("express");
const router = express.Router();
const checkAuth = require("../services/AuthenticateService").checkAuth;

const GroupContactController = require("../controllers/GroupContactController");

router.get("/addContact/:id", GroupContactController.addContact);
router.post("/addContact", GroupContactController.addContactSave);
router.get("/editContacts/:id", GroupContactController.editContacts);
router.post("/removeContacts/", GroupContactController.removeContact);

module.exports = router;
