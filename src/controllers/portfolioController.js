const Portfolio = require("../models/Portfolio");
const { getLiveStock } = require("../services/finnhubService");

// BUY STOCK
exports.buyStock = async (req, res) => {
  const { symbol, quantity, buyPrice } = req.body;

  const stock = await Portfolio.create({
    user: req.user.id,
    symbol,
    quantity,
    buyPrice,
  });

  res.status(201).json({ success: true, data: stock });
};

// GET PORTFOLIO
exports.getPortfolio = async (req, res) => {
  const portfolio = await Portfolio.find({ user: req.user.id });

  let result = [];

  for (let item of portfolio) {
    const live = await getLiveStock(item.symbol);

    const currentPrice = live.c;
    const investment = item.quantity * item.buyPrice;
    const currentValue = item.quantity * currentPrice;
    const profitLoss = currentValue - investment;

    result.push({
      symbol: item.symbol,
      quantity: item.quantity,
      buyPrice: item.buyPrice,
      currentPrice,
      investment,
      currentValue,
      profitLoss,
    });
  }

  res.json({ success: true, portfolio: result });
};
