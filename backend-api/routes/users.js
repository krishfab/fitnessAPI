const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const { verify } = require("../auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/details", verify, userController.getDetails);
router.patch("/update-profile", verify, userController.updateProfile);

module.exports = router;