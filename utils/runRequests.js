const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const fetchStatus = require("./fetchStatus");
const checkPoint = require("./checkPoint");
const sendAlert = require("./sendAlert");
const saveInDb = require("./saveInDb");
const saveDataInFiles = require("./saveInJSON");
const logger = require("./logger");

//array of fetched clinicians (fetch by id);
const cliniciansArr = [1, 2, 3, 4, 5, 6];
const baseUrl = process.env.API_URL;

const runRequests = async () => {
  const allData = [];
  for (const clinicianId of cliniciansArr) {
    proceedSingleRequest(clinicianId, allData);
  }
};

async function proceedSingleRequest(clinicianId, allData) {
  const url = `${baseUrl}/${clinicianId}`;
  const response = await fetchStatus(url);
  const responseDate = new Date();
  let record = null;
  //check if response is successfull
  if (response.data && response.data.type) {
    //check if clinitian in safe area
    const isInBoundaries = checkPoint(response.data);
    record = {
      clinicianId,
      isInBoundaries,
      data: response.data,
      date: responseDate,
    };
  } else {
    logger.warn("clinitian #" + clinicianId + " geolocation is unknown");
    record = {
      clinicianId,
      isInBoundaries: false,
      data: null,
      date: responseDate,
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
  if (allData.length === cliniciansArr.length) {
    saveDataInFiles(allData);
  }
}

module.exports = runRequests;
