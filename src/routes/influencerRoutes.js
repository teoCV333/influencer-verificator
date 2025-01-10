const express = require("express");
const router = express.Router();

const influencerController = require("../controllers/influencerController");

router.post("/", influencerController.addInfluencer);
router.get("/", influencerController.getAllInfluencers);
router.get("/:name", influencerController.getInfluencerByName);
router.get("/:category", influencerController.getInfluencerByCategory);
router.patch("/:influencerId", influencerController.addClaimsToInfluencer);

module.exports = router;