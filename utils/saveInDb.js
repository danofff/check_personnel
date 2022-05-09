const Record = require("../Models/Record");
const logger = require("./logger");

const saveInDb = async (record) => {
  //select and check previous status
  let recordToReturn = null;
  try {
    logger.info(`start retriving record of clinitian #${record.clinitianId}`);
    const prevRecord = await Record.findOne(
      { clinitianId: record.clinitianId },
      {},
      { sort: { createdAt: -1 } }
    );

    let counter = prevRecord ? prevRecord.counter : 0;
    let lostSince = prevRecord ? prevRecord.lostSince : Date.now();

    if (prevRecord) {
      const minutesDiff =
        (new Date().getTime() - prevRecord.createdAt.getTime()) / (1000 * 60);
      if (minutesDiff > 2) {
        counter = 0;
        lostSince = Date.now;
      }
    }

    const recordToSave = new Record({
      clinitianId: record.clinitianId,
      counter: counter + 1,
      data: record.data,
      createdAt: Date.now(),
    });

    const savedRecord = await recordToSave.save();
    logger.info(
      `saved record for clinitian #${savedRecord.clinitianId} successfully`
    );
    if (savedRecord.counter % 5 === 1) {
      recordToReturn = savedRecord;
    }
  } catch (error) {
    logger.error(error);
  }

  return recordToReturn;
};

module.exports = saveInDb;
