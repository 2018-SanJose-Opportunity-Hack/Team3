const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DaySchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  timeblocks: [{
    type: Schema.Types.ObjectId,
    ref: 'timeblocks'
  }],
  park: {
    type: Schema.Types.ObjectId,
    ref: 'parks'
  },
  openTime: {
    type: Date,
    required: true,
  },
  closeTime: {
    type: Date,
    required: true
  }
});
mongoose.model('days', DaySchema);