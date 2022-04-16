const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/login", UserController.login);
router.post("/login", UserController.loginSave)
router.get("/register", UserController.register);
router.post("/register", UserController.registerSave);
router.get("/logout", UserController.logout);
router.get("/config", UserController.config)
router.post("/config", UserController.configSave)
router.get("/editPassword", UserController.editPassword)
router.post("/editPassword", UserController.editPasswordSave)

module.exports = router;
