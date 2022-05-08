const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const fetchStatus = require("./fetchStatus");
const checkPoint = require("./checkPoint");
const sendAlerts = require("./sendAlerts");
const saveDataInFiles = require("./saveInJSON");
const saveInDb = require("./saveInDb");
const logger = require("./logger");

//array of fetched clinitians (fetch by id);
const clinitiansArr = [1, 2, 3, 4, 5, 6, 7];
const baseUrl = process.env.API_BASE_URL;

const runRequests = async () => {
  const currentDate = new Date(Date.now());
  //fetch data from api
  const responses = await Promise.all(
    clinitiansArr.map((id) => fetchStatus(`${baseUrl}/clinicianstatus/${id}`))
  );

  const notInBoundaries = [];
  const allData = [];
  //check if clinitian is in boundaries
  responses.forEach((response, idx) => {
    if (response.status === 200) {
      const isInBoundaries = checkPoint(response.data);
      if (!isInBoundaries) {
        notInBoundaries.push({
          id: idx + 1,
          isInBoundaries,
          data: response.data,
        });
      }
      allData.push({ id: idx + 1, isInBoundaries, data: response.data });
    } else {
      logger.warn("clinitian #" + (idx + 1) + " geolocation is not known");
      notInBoundaries.push({
        id: idx + 1,
        isInBoundaries: false,
        data: null,
      });
    }
  });

  //saving data logs
  logger.info("saving data in files is started");
  saveDataInFiles(allData);

  //saving notInBoundaries in database
  await saveInDb(notInBoundaries);

  // sendAlerts(notInBoundaries, currentDate);
};

module.exports = runRequests;
