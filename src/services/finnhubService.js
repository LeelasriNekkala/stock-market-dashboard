const api = require("../utils/apiClient");

exports.getLiveStock = async (symbol) => {
  const res = await api.get("/quote", {
    params: {
      symbol,
      token: process.env.FINNHUB_API_KEY,
    },
  });
  return res.data;
};
