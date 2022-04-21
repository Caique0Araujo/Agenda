const express = require("express");
const router = express.Router();
const checkAuth = require("../services/AuthenticateService").checkAuth;

const GroupController = require("../controllers/GroupController");

router.get("/add", checkAuth, GroupController.createGroup);
router.post("/addgroup", checkAuth, GroupController.createGroupSave);

router.get("/edit/:id", checkAuth, GroupController.editGroup);
router.post("/editgroup", checkAuth, GroupController.editGroupPost);

router.get("/groups", checkAuth, GroupController.showGroups);
router.get("/group/:id", checkAuth, GroupController.showGroup);

router.post("/delete", checkAuth, GroupController.deleteGroup);

module.exports = router;
