const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParkSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  image: {
    type: String,
    default: 'none'
  },
  timeDays: [{
    min:{
      type: String,
      required: true
    },
    max:{
      type: String,
      required: true
    }
  }],
  days: [{
    type: Schema.Types.ObjectId,
    ref: 'days'
  }],
  desc: {
    type: String,
    default: 'none'
  },
  address:{
    type: String,
    required: true
  },
  photos: [{
    type: String
  }]
});

mongoose.model('parks', ParkSchema);