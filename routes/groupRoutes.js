const express = require('express')
const router = express.Router()

const GroupController = require('../controllers/GroupController')

router.get('/add', GroupController.createGroup)
router.post('/addgroup', GroupController.createGroupSave)

router.get('/edit/:id', GroupController.editGroup)
router.post('/editgroup', GroupController.editGroupPost)

router.get('/groups', GroupController.showGroups)
router.get('/group/:id', GroupController.showGroup)

router.post('/delete', GroupController.deleteGroup)

module.exports = router