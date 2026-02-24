const api = require("../utils/apiClient");

exports.fetchLiveStock = async (symbol) => {
  const response = await api.get("", {
    params: {
      function: "GLOBAL_QUOTE",
      symbol,
      apikey: process.env.STOCK_API_KEY,
    },
  });

  return response.data;
};
