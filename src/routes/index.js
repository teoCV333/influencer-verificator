import express from "express";
import influencerRouter from "./influencerRoutes.js";

const router = express.Router();

router.use("/influencer", influencerRouter);

export default router;