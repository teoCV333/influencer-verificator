import express from "express";
import InfluencerController from "../controllers/influencerController.js";
import { validationsMiddleware } from "../middlewares/validations.js";

const router = express.Router();
const influencerController = new InfluencerController();

router
  .post("/", validationsMiddleware, influencerController.addNewInfluencer)
  .get("/", influencerController.getAllInfluencers)
  .get("/:name", influencerController.getInfluencerByName)
  .get(
    "/profile/:id",
    validationsMiddleware,
    influencerController.getInfluencerById
  );
/* .get("/new-claims/:id", influencerController.searchNewInfluencerClaims) */

export default router;
