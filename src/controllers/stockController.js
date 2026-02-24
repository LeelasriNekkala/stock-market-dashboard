const Stock = require("../models/Stock");
const { getLiveStock } = require("../services/finnhubService");
const apiClient = require("../utils/apiClient");

const API_KEY = process.env.FINNHUB_API_KEY;

// =======================================================
// ✅ USER — Get ONE stock quote (LIVE)
// =======================================================
exports.getStockQuote = async (req, res) => {
  try {
    const { symbol } = req.params;
    const upperSymbol = symbol.toUpperCase();

    // 🔹 fetch live data
    const data = await getLiveStock(upperSymbol);
    console.log("Finnhub API Data:", data);

    // 🔹 ONLY update live cache stock (not admin stock)
    let stock = await Stock.findOne({
      symbol: upperSymbol,
      isAdminStock: { $ne: true },
    });

    if (!stock) {
      stock = await Stock.create({
        symbol: upperSymbol,
        current: data.c,
        high: data.h,
        low: data.l,
        open: data.o,
        previousClose: data.pc,
        isAdminStock: false, // ⭐ IMPORTANT
      });
    } else {
      stock.current = data.c;
      stock.high = data.h;
      stock.low = data.l;
      stock.open = data.o;
      stock.previousClose = data.pc;
      await stock.save();
    }

    res.json({
      success: true,
      data: stock,
    });
  } catch (error) {
    console.error("Error in getStockQuote:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================================
// ✅ USER — Get ALL stocks list (from Finnhub)
// =======================================================
exports.getAllStocks = async (req, res) => {
  try {
    const { limit = 50 } = req.query;

    const response = await apiClient.get(
      `/stock/symbol?exchange=US&token=${API_KEY}`,
    );

    const stocks = response.data.slice(0, Number(limit));

    res.json({
      success: true,
      count: stocks.length,
      data: stocks,
    });
  } catch (error) {
    console.error("Error in getAllStocks:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================================
// 🔐 ADMIN — Add stock to DB
// =======================================================
exports.addStock = async (req, res) => {
  try {
    const { symbol, name, price } = req.body;

    if (!symbol) {
      return res.status(400).json({
        success: false,
        message: "Symbol is required",
      });
    }

    const upperSymbol = symbol.toUpperCase();

    // 🔹 prevent duplicate ADMIN stocks only
    const exists = await Stock.findOne({
      symbol: upperSymbol,
      isAdminStock: true,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Admin stock already exists",
      });
    }

    const stock = await Stock.create({
      symbol: upperSymbol,
      name,
      current: price || 0,
      isAdminStock: true, // ⭐⭐ VERY IMPORTANT
    });

    res.json({
      success: true,
      message: "Stock added successfully",
      data: stock,
    });
  } catch (error) {
    console.error("Error in addStock:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================================
// 🔐 ADMIN — Delete stock
// =======================================================
exports.deleteStock = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔹 delete ONLY admin stock
    const stock = await Stock.findOneAndDelete({
      _id: id,
      isAdminStock: true,
    });

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Admin stock not found",
      });
    }

    res.json({
      success: true,
      message: "Stock deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteStock:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
