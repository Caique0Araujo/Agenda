const express = require('express')
const router = express.Router()
const checkAuth = require('../services/AuthenticateService').checkAuth

const EventContactController = require('../controllers/EventContactController')

router.get('/addContact/:id', EventContactController.addContact)
router.post('/addContact', EventContactController.addContactSave)


module.exports = router