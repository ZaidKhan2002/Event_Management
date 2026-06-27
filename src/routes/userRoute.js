const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validateUser } = require("../middleware/validator");
const { authenticate, authorize } = require("../middleware/auth");

router.post("/register", validateUser, userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/users", authenticate, authorize(["organizer"]), userController.getAllUsers);

module.exports = router;    