const Record = require("../Models/Record");
const logger = require("./logger");

const saveInDb = async (notInBoundaries) => {
  for (const clinitian of notInBoundaries) {
    //select and check previous status
    try {
      logger.info(`start to retrive records of clinitian #${clinitian.id}`);
      const prevRecords = await Record.find({ clinitianId: clinitian.id }).sort(
        {
          createdAt: "desc",
        }
      );
      const prevRecord = prevRecords ? prevRecords[0] : null;
      // console.log("previous record", prevRecord);

      //if save data already sent
      const counter = prevRecord ? prevRecord.counter : 0;
      const recordToSave = new Record({
        clinitianId: clinitian.id,
        counter: counter + 1 <= 5 ? counter + 1 : 1,
        data: clinitian.data,
      });

      const savedRecord = await recordToSave.save();

      //send messege from here???
      logger.info("saved record successfully");
    } catch (error) {
      logger.error(error);
    }
  }
};

module.exports = saveInDb;
