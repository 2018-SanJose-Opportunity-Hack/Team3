const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Subscribed = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    time: {
        type: Schema.Types.ObjectId,
        ref : 'timeblocks'
    }


});
mongoose.model('subscribe', Subscribed);






//
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const Subscribed = new Schema({
//     startTime: {
//         type: Date,
//         required: true
//     },
//     endTime: {
//         type: Date,
//         required: true
//     },
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'users'
//     }
//
// });
// mongoose.model('subscribe', Subscribed);
