const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/login", UserController.login);
router.post("/login", UserController.loginSave)
router.get("/register", UserController.register);
router.post("/register", UserController.registerSave);
router.get("/logout", UserController.logout);

module.exports = router;
