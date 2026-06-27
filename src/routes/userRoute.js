const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validateUser } = require("../middleware/validator");
const { authenticateUser } = require("../middleware/auth");

router.post("/", validateUser, userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/users", authenticateUser, userController.getAllUsers);

module.exports = router;    