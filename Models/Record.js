const { Schema, SchemaTypes, model, SchemaType } = require("mongoose");

const recordSchema = new Schema({
  clinicianId: {
    type: Number,
    required: true,
  },
  data: Object,
  createdAt: {
    type: Date,
  },
  lostSince: {
    type: Date,
  },
  counter: {
    type: Number,
    default: 1,
  },
});

const RecordModel = model("Record", recordSchema);

module.exports = RecordModel;
