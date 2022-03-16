const express = require('express')
const router = express.Router()

const ContactController = require('../controllers/ContactController')


router.get('/add', ContactController.createContact)
router.post('/addcontact', ContactController.createContactSave)

router.get('/edit/:id', ContactController.editContact)
router.post('/editcontact', ContactController.editContactPost)

router.get('/contacts', ContactController.showContacts)
router.get('/contact/:id', ContactController.showContact)

router.post('/delete', ContactController.deleteContact)

module.exports = router



