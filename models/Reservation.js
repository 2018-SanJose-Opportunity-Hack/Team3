const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  submitTime: {
    type: Date,
    default: Date.now
  },
  duration: {
    type: Number,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: 'Pending'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  isApproved: {
    type: Boolean,
    default: false
  }
  
});
mongoose.model('reservations', ReservationSchema);