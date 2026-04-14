const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");

router.route("/allusers/:auth").get(usersController.getAllUsers);
router.route("/user/:id").get(usersController.getUser)
router.route("/updateEnergy/:id").put(usersController.updateEnergyHandler)
router.route("/spendEnergy/:id").put(usersController.spendEnergyHandler)
router.route("/videoEnergy/:id").put(usersController.videoEnergyHandler)

module.exports = router;