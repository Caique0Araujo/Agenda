const express = require('express')
const router = express.Router()
const checkAuth = require('../services/AuthenticateService').checkAuth


const EventController = require('../controllers/EventController')

router.get('/add', checkAuth, EventController.createEvent)
router.post('/addevent', checkAuth, EventController.createEventSave)

router.get('/edit/:id', checkAuth, EventController.editEvent)
router.post('/editevent', checkAuth, EventController.editEventPost)

router.get('/events', checkAuth, EventController.showEvents)
router.get('/event/:id', checkAuth, EventController.showEvent)

router.post('/delete', checkAuth, EventController.deleteEvent)


module.exports = router