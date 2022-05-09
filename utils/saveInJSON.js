const path = require("path");
const fs = require("fs");
const logger = require("./logger");

const saveDataInFiles = (cliniciansData) => {
  const folderPath = path.join(
    __dirname,
    "..",
    "logs",
    Date(Date.now()).toString()
  );
  fs.mkdir(folderPath, (error, data) => {
    if (error) {
      logger.error("error in folder creation", error);
    } else {
      logger.info("folder is created");
      cliniciansData.forEach((clinician) => {
        const filePath = path.join(
          folderPath,
          clinician.clinicianId.toString() + ".json"
        );
        writeToFile(filePath, clinician);
      });
    }
  });
};

function writeToFile(filepath, data) {
  fs.open(filepath, "r", function (fileNotExists, file) {
    if (fileNotExists) {
      fs.writeFile(filepath, JSON.stringify(data), (error) => {
        if (error) {
          logger.error(error);
        }
      });
    } else {
      logger.error("File already exists!");
    }
  });
}

module.exports = saveDataInFiles;
