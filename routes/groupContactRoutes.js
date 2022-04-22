const express = require("express");
const router = express.Router();
const checkAuth = require("../services/AuthenticateService").checkAuth;

const GroupContactController = require("../controllers/GroupContactController");

router.get("/addContact/:id", checkAuth, GroupContactController.addContact);
router.post("/addContact", checkAuth, GroupContactController.addContactSave);
router.get("/editContacts/:id", checkAuth, GroupContactController.editContacts);
router.post("/removeContacts/", checkAuth, GroupContactController.removeContact);

module.exports = router;
