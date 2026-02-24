const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  symbol: String,
  current: Number,
  high: Number,
  low: Number,
  open: Number,
  previousClose: Number,

  // ⭐ ADD THIS
  isAdminStock: {
    type: Boolean,
    default: false,
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Stock", stockSchema);
