const express = require("express");
const router = express.Router();

const {
  buyStock,
  getPortfolio,
} = require("../controllers/portfolioController.js");
const protect = require("../middlewares/authMiddleware.js");

router.post("/buy", protect, buyStock);
router.get("/", protect, getPortfolio);

module.exports = router;
