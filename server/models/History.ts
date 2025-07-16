import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    coinId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    marketCap: {
      type: Number,
      required: true,
    },
    priceChange24h: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rank: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
historySchema.index({ coinId: 1, timestamp: -1 });

export default mongoose.model("History", historySchema);
