require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db.js");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

// ================= DB =================
connectDB();

// ================= SECURITY =================
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

// ================= PARSERS =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ================= LOGGER =================
app.use(morgan("dev"));

// ================= STATIC =================
app.use(express.static(path.join(__dirname, "../public")));

// ================= VIEW ENGINE =================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================= API ROUTES =================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/stocks", require("./routes/stockRoutes"));

app.use("/api/portfolio", require("./routes/portfolioRoutes"));

// ================= VIEW ROUTES =================
const viewRoutes = require("./routes/viewRoutes");
app.use("/", viewRoutes);

module.exports = app;
