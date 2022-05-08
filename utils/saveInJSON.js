const path = require("path");
const fs = require("fs");
const logger = require("./logger");

const saveDataInFiles = (clinitiansData) => {
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
      clinitiansData.forEach((clinitian) => {
        const filePath = path.join(
          folderPath,
          clinitian.id.toString() + ".json"
        );
        writeToFile(filePath, clinitian);
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
        } else {
          logger.info("file created");
        }
      });
    } else {
      logger.error("File already exists!");
    }
  });
}

module.exports = saveDataInFiles;
