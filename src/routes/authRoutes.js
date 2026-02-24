const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController.js");
const protect = require("../middlewares/authMiddleware.js");

router.post("/register", register);
router.post("/login", login);

router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = router;
