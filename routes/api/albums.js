const express = require("express");
const router = express.Router();
const albumsController = require("../../controllers/albumsController");

router.route("/").get(albumsController.getAllAlbums);

module.exports = router;
