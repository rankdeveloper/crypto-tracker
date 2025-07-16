import mongoose from 'mongoose';

const coinSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  marketCap: {
    type: Number,
    required: true
  },
  priceChange24h: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rank: {
    type: Number,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Coin', coinSchema);