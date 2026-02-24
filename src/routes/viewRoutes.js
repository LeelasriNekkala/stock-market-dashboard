const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const adminOnly = require("../middlewares/adminMiddleware");

const Portfolio = require("../models/Portfolio");
const User = require("../models/User");
const Stock = require("../models/Stock");

const { getLiveStock } = require("../services/finnhubService");

// ================= HOME =================
router.get("/", (req, res) => {
  res.render("index");
});

// ================= LOGIN =================
router.get("/login", (req, res) => {
  res.render("auth/login");
});

// ================= REGISTER =================
router.get("/register", (req, res) => {
  res.render("auth/register");
});

// ================= USER DASHBOARD =================
router.get("/dashboard", protect, async (req, res) => {
  try {
    const stocks = await Portfolio.find({ user: req.user.id });

    let portfolio = [];

    for (let item of stocks) {
      const live = await getLiveStock(item.symbol);

      const currentPrice = live?.c || 0;
      const investment = item.quantity * item.buyPrice;
      const currentValue = item.quantity * currentPrice;
      const profitLoss = currentValue - investment;

      portfolio.push({
        symbol: item.symbol,
        quantity: item.quantity,
        buyPrice: item.buyPrice,
        currentPrice,
        profitLoss,
      });
    }

    res.render("portfolio/dashboard", { portfolio });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// ================= ADMIN DASHBOARD =================
router.get("/admin/dashboard", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    const stocks = await Stock.find();

    res.render("admin/dashboard", {
      users,
      stocks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// ================= BUY PAGE =================
router.get("/buy", protect, (req, res) => {
  res.render("portfolio/buy");
});

// ================= BUY STOCK =================
router.post("/buy", protect, async (req, res) => {
  try {
    const { symbol, quantity, buyPrice } = req.body;

    await Portfolio.create({
      user: req.user.id,
      symbol,
      quantity,
      buyPrice,
    });

    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
