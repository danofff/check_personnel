const Record = require("../Models/Record");
const logger = require("./logger");

const saveInDb = async (outOfRangeClin) => {
  const clinitiansToSendEmail = [];
  for (const clinitian of outOfRangeClin) {
    //select and check previous status
    try {
      logger.info(`start retriving records of clinitian #${clinitian.id}`);
      const prevRecord = await Record.findOne(
        { clinitianId: clinitian.id },
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
        clinitianId: clinitian.id,
        counter: counter + 1,
        data: clinitian.data,
        createdAt: new Date(),
      });

      const savedRecord = await recordToSave.save();
      if (savedRecord.counter % 5 === 1) {
        clinitiansToSendEmail.push(savedRecord);
      }
      logger.info(
        `saved record for clinitian #${savedRecord.clinitianId} successfully`
      );
    } catch (error) {
      logger.error(error);
    }
  }
  return clinitiansToSendEmail;
};

module.exports = saveInDb;
