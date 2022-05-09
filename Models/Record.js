const { Schema, SchemaTypes, model, SchemaType } = require("mongoose");

const recordSchema = new Schema({
  clinitianId: {
    type: Number,
  },
  data: Object,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  lostSince: {
    type: Date,
    default: Date.now(),
  },
  counter: {
    type: Number,
    default: 1,
  },
});

const RecordModel = model("Record", recordSchema);

module.exports = RecordModel;
