import express from "express";
import InfluencerController from "../controllers/influencerController.js";

const router = express.Router();
const influencerController = new InfluencerController();

router.post("/", influencerController.addNewInfluencer)
    .get("/", influencerController.getAllInfluencers)
    .get("/:name", influencerController.getInfluencerByName)
    .get("/profile/:id", influencerController.getInfluencerById)
    .get("/new-claims/:id", influencerController.searchNewInfluencerClaims);

export default router;