const router = require("express").Router();

const protect = require("../middlewares/authMiddleware");
const adminOnly = require("../middlewares/adminMiddleware");

const {
  getStockQuote,
  getAllStocks,
  addStock,
  deleteStock,
} = require("../controllers/stockController");

// 👤 users
router.get("/all", protect, getAllStocks);
router.get("/:symbol", protect, getStockQuote);

// 🔐 admin only
router.post("/add", protect, adminOnly, addStock);
router.delete("/:id", protect, adminOnly, deleteStock);

module.exports = router;
