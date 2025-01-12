const express = require("express");
const router = express.Router();

const influencerController = require("../controllers/influencerController");

router.get("/", influencerController.getAllInfluencers);
router.get("/:name/:filter/:token", influencerController.getInfluencerByName);

module.exports = router;