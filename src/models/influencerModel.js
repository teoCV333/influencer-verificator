const mongoose = require("mongoose");

const influencerSchema = new mongoose.Schema({
      name: {
        type: String,
        unique: true,
        required: true,
      },
      description: {
        type: String,
        trim: true,
      },
      categories: {
        type: [String],
        required: true,
      },
      claims: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Claims',
            required: false
        }
      ],
      totalAverageFollowers: {
        type: Number,
        required: true,
        default: 0,
        min: 0, // Ensure no negative values
      },
      trustScore: {
        type: Number,
        required: false,
        default: 0,
        min: 0
      },
    },
    {
      timestamps: false,
    }
  );


module.exports = mongoose.model("Influencer", influencerSchema);