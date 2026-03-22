const express = require("express");
const router = express.Router();
const lyricsController = require("../../controllers/lyricsController");
const gameController = require("../../controllers/gameController")

router.route("/").get(lyricsController.getLyrics);
router.route("/guess").post(gameController.returnScore)

module.exports = router;