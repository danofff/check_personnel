const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const fetchStatus = require("./fetchStatus");
const checkPoint = require("./checkPoint");
const sendAlert = require("./sendAlert");
const saveDataInFiles = require("./saveInJSON");
const saveInDb = require("./saveInDb");
const logger = require("./logger");

//array of fetched clinitians (fetch by id);
const clinitiansArr = [1, 2, 3, 4, 5, 6, 7];
const baseUrl = process.env.API_URL;

const runRequests = async () => {
  //fetch data from api
  // const responses = await Promise.all(
  //   clinitiansArr.map((id) => fetchStatus(`${baseUrl}/clinicianstatus/${id}`))
  // );
  const allData = [];
  for (const clinitianId of clinitiansArr) {
    proceedSingleRequest(clinitianId, allData);
  }
};

async function proceedSingleRequest(clinitianId, allData) {
  const url = `${baseUrl}/${clinitianId}`;
  const response = await fetchStatus(url);

  let record = null;
  //check if response is successfull
  if (response.data && response.data.type) {
    //check if clinitian in safe area
    const isInBoundaries = checkPoint(response.data);
    record = {
      clinitianId,
      isInBoundaries,
      data: response.data,
    };
  } else {
    logger.warn("clinitian #" + clinitianId + " geolocation is unknown");
    record = {
      clinitianId,
      isInBoundaries: false,
      data: null,
    };
  }

  if (!record.isInBoundaries) {
    //save in DB
    const savedInDB = await saveInDb(record);
    //send alert
    if (savedInDB) {
      const resultOfAlertSending = await sendAlert(savedInDB);
    }
  }
  //save data in logs
  allData.push(record);
  if (allData.length === clinitiansArr.length) {
    saveDataInFiles(allData);
  }
}

module.exports = runRequests;
