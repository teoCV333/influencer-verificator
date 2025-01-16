const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema({
    url: { type: String, required: true },
    title: { type: String, required: true }
});

const claimSchema = new mongoose.Schema({
    claimText: { type: String, required: true },
    datePosted: { type: Date, required: true },
    postUrl: { type: String, required: true },
    categories: { type: [String], required: true },
    verificationStatus: { type: String, enum: ['Verified', 'Questionable', 'Debunked'], required: true },
    sources: { type: [sourceSchema], required: true }
});

const influencerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contentCategories: { type: [String], required: true },
    description: { type: String, required: true },
    quantityFollowers: { type: Number, required: true },
    claims: { type: [claimSchema], required: true },
    score: { type: Number, required: false, default: 0 }
});

// Create a model based on the influencer schema
const Influencer = mongoose.model('Influencer', influencerSchema);

module.exports = Influencer;