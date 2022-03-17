const express = require('express')
const router = express.Router()

const EventController = require('../controllers/EventController')

router.get('/add', EventController.createEvent)
router.post('/addevent', EventController.createEventSave)

router.get('/edit/:id', EventController.editEvent)
router.post('/editevent', EventController.editEventPost)

router.get('/events', EventController.showEvents)
router.get('/event/:id', EventController.showEvent)

router.post('/delete', EventController.deleteEvent)

module.exports = router