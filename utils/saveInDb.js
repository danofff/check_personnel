const Record = require("../Models/Record");
const logger = require("./logger");

const saveInDb = async (record) => {
  //select and check previous status
  let recordToReturn = null;
  try {
    logger.info(`start retriving record of clinician #${record.clinicianId}`);
    const prevRecord = await Record.findOne(
      { clinicianId: record.clinicianId },
      {},
      { sort: { createdAt: -1 } }
    );

    let counter = prevRecord ? prevRecord.counter : 0;
    let lostSince = prevRecord ? prevRecord.lostSince : record.date;

    //check if clinitian is still in "lost" sequence
    if (prevRecord) {
      const minutesDiff =
        (record.date.getTime() - prevRecord.createdAt.getTime()) / (1000 * 60);
      if (minutesDiff > 1) {
        counter = 0;
        lostSince = record.date;
      }
    }

    const recordToSave = new Record({
      clinicianId: record.clinicianId,
      counter: counter + 1,
      data: record.data,
      createdAt: record.date,
      lostSince: lostSince,
    });

    const savedRecord = await recordToSave.save();
    logger.info(
      `saved record #${savedRecord.id} for clinician #${savedRecord.clinicianId} successfully`
    );
    if (savedRecord.counter % 10 === 1) {
      recordToReturn = savedRecord;
    }
  } catch (error) {
    logger.error(error);
  }

  return recordToReturn;
};

module.exports = saveInDb;
