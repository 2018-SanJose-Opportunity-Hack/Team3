const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TimeBlockSchema = new Schema({
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  day: {
    type: Schema.Types.ObjectId,
    ref: 'days'
  },
  reservation: {
    type: Schema.Types.ObjectId,
    ref: 'reservations'
  },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    subscriptions: [{
      type: Schema.Types.ObjectId,
      ref: 'subscribe'
    }]

});
mongoose.model('timeblocks', TimeBlockSchema);