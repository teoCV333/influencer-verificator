import { Schema, model } from "mongoose";

const sourceSchema = new Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
});

const claimSchema = new Schema({
  claimText: { type: String, required: true },
  datePosted: { type: Date, required: true },
  postUrl: { type: String, required: true },
  categories: { type: [String], required: true },
  verificationStatus: {
    type: String,
    enum: ["Verified", "Questionable", "Debunked"],
    required: true,
  },
  sources: { type: [sourceSchema], required: true },
});

const influencerSchema = new Schema({
  name: { type: String, required: true },
  contentCategories: { type: [String], required: true },
  description: { type: String, required: true },
  quantityFollowers: { type: Number, required: true },
  claims: { type: [claimSchema], required: true },
  score: { type: Number, required: false, default: 0 },
});

export const Influencer = model("Influencer", influencerSchema);
