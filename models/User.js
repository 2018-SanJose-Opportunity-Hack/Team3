const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  reservations: [{
    type: Schema.Types.ObjectId,
    ref: 'reservations'
  }],
  status: {
    type: String,
    default: 'regular'
  }
});

mongoose.model('users', UserSchema);