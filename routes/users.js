const express = require("express");
const router = express.Router();
const { signinUser, signupUser } = require("../controllers/userController");

// Login
router.post("/Signin", signinUser);

// register
router.post("/Signup", signupUser);

module.exports = router;
