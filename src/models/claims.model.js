import mongoose from 'mongoose';

const claimsSchema = new mongoose.Schema(
  {
    datePosted: {
      type: Date,
      required: true
    },
    categories: {
        type: [String],
        required: true,
    },
    verify_status: {
      type: String,
      enum: ['Verified', 'Questionable', 'Debunked'],
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model('Claims', claimsSchema);