const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const checkAuth = require("../services/AuthenticateService").checkAuth;

router.get("/login", UserController.login);
router.post("/login", UserController.loginSave);
router.get("/register", UserController.register);
router.post("/register", UserController.registerSave);
router.get("/logout", UserController.logout);
router.get("/config", checkAuth, UserController.config);
router.post("/config", checkAuth, UserController.configSave);
router.get("/editPassword", checkAuth, UserController.editPassword);
router.post("/editPassword", checkAuth, UserController.editPasswordSave);
router.get("/deleteUser", checkAuth, UserController.deleteUser)
router.post("/deleteUser", checkAuth, UserController.deleteUserSave)

module.exports = router;
