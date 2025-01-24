const express = require("express");
const router = express.Router();

const influencerController = require("../controllers/influencerController");

router.post("/", influencerController.addNewInfluencer);
router.get("/", influencerController.getAllInfluencers);
router.get("/:name", influencerController.getInfluencerByName);
router.get("/profile/:id", influencerController.getInfluencerById);
/* router.get("/new-claims/:id", influencerController.searchNewInfluencerClaims);
 */
module.exports = router;