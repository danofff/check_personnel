const axios = require("axios");

const fetchStatus = async (url) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    return { data: null };
  }
};

module.exports = fetchStatus;
