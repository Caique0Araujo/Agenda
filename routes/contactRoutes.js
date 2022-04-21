const express = require("express");
const router = express.Router();
const checkAuth = require("../services/AuthenticateService").checkAuth;

const ContactController = require("../controllers/ContactController");

router.get("/add", checkAuth, ContactController.createContact);
router.post("/addcontact", checkAuth, ContactController.createContactSave);

router.get("/edit/:id", checkAuth, ContactController.editContact);
router.post("/editcontact", checkAuth, ContactController.editContactPost);

router.get("/contacts", checkAuth, ContactController.showContacts);
router.get("/contact/:id", checkAuth, ContactController.showContact);

router.post("/delete", checkAuth, ContactController.deleteContact);

module.exports = router;
