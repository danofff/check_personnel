const cron = require("node-cron");
const mongoose = require("mongoose");
require("dotenv").config();

const runRequests = require("./utils/runRequests");
const logger = require("./utils/logger");

//**DATA ENTRIES**/
const cronSchedule = "*/30 * * * * *";

const DB_CONNECTION = process.env.DB_CONNECTION;

mongoose
  .connect(DB_CONNECTION)
  .then((result) => {
    //cron function to fetch data every 30 seconds
    logger.info("database runs successfully");
    cron.schedule(cronSchedule, runRequests);
  })
  .catch((error) => {
    logger.error(error);
  });
