const { Schema, SchemaTypes, model, SchemaType } = require("mongoose");

const recordSchema = new Schema({
  clinitianId: {
    type: Number,
  },
  data: Object,
  messegeSent: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  counter: {
    type: Number,
    default: 1,
  },
});

const RecordModel = model("Record", recordSchema);

module.exports = RecordModel;
