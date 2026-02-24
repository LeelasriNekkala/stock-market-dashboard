const axios = require("axios");

module.exports = axios.create({
  baseURL: "https://finnhub.io/api/v1",
  timeout: 5000,
});
