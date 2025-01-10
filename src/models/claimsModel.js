const mongoose = require("mongoose");

const claimsSchema = new mongoose.Schema(
  {
    claim: {
      type: String,
      required: true
    },
    datePosted: {
      type: Date,
      required: true
    },
    categories: {
        type: [String],
        required: true,
    },
    status: {
      type: String,
      enum: ['Verified', 'Questionable', 'Debunked'],
      required: false,
    },
    sources: {
      type: [String],
      required: false
    }
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model('Claims', claimsSchema);