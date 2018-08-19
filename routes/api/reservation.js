const mongoose = require('mongoose');
const async = require('async');
const moment = require('moment-timezone');
const router = require('express').Router();
const passport = require('passport');

//import models
const Park = mongoose.model('parks');
const User = mongoose.model('users');
const Day = mongoose.model('days');
const TimeBlock = mongoose.model('timeblocks');
const Reservation  = mongoose.model('reservations');
const Subscribe = mongoose.model('subscribe');
const schedule = require('node-schedule');



const sendEmail= require('../../util/notification');






//THIS IS A TEST API,

// @route   POST api/reservation/hell
// @desc    Subscribe
// @access  Public
router.post("/hello",  passport.authenticate('jwt', {session: false}), (req, res)=>{
    User.findById(req.user.id)
        .then(user=> {
            if (!user) {
                return res.status(401).json({errors: 'Not an existing user'});
            }
            Subscribe.find({
                time : "5b78be509eaebe056004ba78"
            }).then(retSubscribed=>{

                console.log("this is the email" + retSubscribed)
                User.find({
                    id : retSubscribed.id
                }).then(retUser=>{
                    //use api to send email
                    //retUser.email

                })

            })


            // User.find({
            //     _id : retSubscribed.user
            // }).then(retUser=>{
            //         let email = retUser.email;
            //         console.log("this is the email" + email);
            //     }
            //
            // ))






            return res.json({success: true, reservation: "subscribed"});
        })





});








// @route   POST api/reservation/subscribe/:parkId/:dayId/:timeBlockId
// @desc    Subscribe
// @access  Public

router.post("/subscribe/:parkId/:dayId/:timeBlockId",  passport.authenticate('jwt', {session: false}), (req, res)=>{
    User.findById(req.user.id)
        .then(user=> {
            if (!user) {
                return res.status(401).json({errors: 'Not an existing user'});
            }

            let newSubscription = new Subscribe({
                user : user.id,
                time : req.params.timeBlockId

            })

            newSubscription.save()
              .then(subscription => {

                TimeBlock.findByIdAndUpdate(req.params.timeBlockId,{$push: {subscriptions: subscription.id}}, {new: true})
                  .then(()=>{
                    return res.json({success: true});
                  });
              })
              .catch(err => {
                  console.error(err)
              })

            const momentObj = moment().tz('America/Los_Angeles');
            let openTime =momentObj.toDate().toDateString();
            console.log("Hey logging open time " + openTime);

        })
});

// @route   DELETE api/reservation/unsubscribe/:parkId/:dayId/:timeBlockId
// @desc    Subscribe
// @access  Public

router.delete("/unsubscribe/:timeBlockId",  passport.authenticate('jwt', {session: false}), (req, res)=>{
    User.findById(req.user.id)
        .then(user=> {
            if (!user) {
                return res.status(401).json({errors: 'Not an existing user'});
            }
            console.log(req.user.id, req.params.timeBlockId);
            Subscribe.findOneAndRemove({user: req.user.id, time: req.params.timeBlockId})
              .then(subscription=>{
                if(!subscription){
                  return res.status(404).json({errors: 'Subscription does not exist'});
                }
                TimeBlock.findByIdAndUpdate(req.params.timeBlockId, {$pull: {subscriptions: subscription.id}}, {new: true})
                  .then(()=>{
                    return res.json({success: true});
                  })
                  .catch(err=>{
                    console.log('err in timeblock');
                  })
              })
              .catch(err=>{
                console.log('err in subscribe');
              })


        })
});

// @route   POST api/reservation/:parkId/:dayId/:timeBlockId
// @desc    Reserve
// @access  Private
router.post('/:parkId/:dayId/:timeBlockId', passport.authenticate('jwt', {session: false}), (req, res)=>{
  User.findById(req.user.id)
    .then(user=>{
      if(!user){
        return res.status(401).json({errors: 'Not an existing user'});
      }
      if(!user.isApproved){
        return res.status(403).json({errors: 'No permission'});
      }

      
      async.parallel([
        (callback)=>{
          Park.findById(req.params.parkId)
            .then(park=>{
              callback(null, park? {res: true, park}:  {res: false, park})
            })
        },
        (callback)=>{
          Day.findById(req.params.dayId)
            .then(day=>{
              if(!day){
                callback( null,{res: false, day});
              }else {
                callback(null,{res: true, day});
              }
            })
        },
        (callback)=>{
          TimeBlock.findById(req.params.timeBlockId)
            .then(timeblock=>{
              if(!timeblock){
                callback(null,{res: false, timeblock})
              }else if(timeblock.day.toString()===req.params.dayId&&timeblock.isAvailable){
                callback(null,{res: true, timeblock});
              }else{
                callback(null,{res: false, timeblock});
              }
            })
        }
      ], (err, results)=>{
        const length = results.filter(el=> el.res).length;
        console.log(length)
        if(length!==3){
          return res.status(400).json({errors: 'Wrong Parameters'});
        }
        const reservation = new Reservation({
          duration: 3600000,
          startTime: results[2].timeblock.startTime,
          endTime: results[2].timeblock.endTime,
          status: 'Upcoming',
          isApproved: true,
          user: user.id
        })
        reservation.save()
          .then(reserve=>{
            TimeBlock.findByIdAndUpdate(req.params.timeBlockId, {$set: {isAvailable: false, reservation: reserve.id}})
              .then(timeblock=>{
                User.findByIdAndUpdate(req.user.id, {$push: {reservations: reserve.id}}, {new: true})
                  .then(user=>{

                      return res.json({success: true, reservation: reserve})
                    }
                  );
              })
          })
      })
    })
});
// @route   PUT api/reservation/cancel/:reservationId
// @desc    Cancel Reservation
// @access  Private
router.put('/cancel/:reservationId', passport.authenticate('jwt', {session: false}), (req, res)=>{
  User.findById(req.user.id)
    .then(user=>{
      if(!user){
        return res.status(401).json({errors: 'Not an existing user'});
      }
      if(!user.isApproved){
        return res.status(403).json({errors: 'No permission'});
      }
      Reservation.findById(req.params.reservationId)
        .then(reservation=>{
          if(!reservation){
            return res.status(404).json({errors: 'Reservation does not exists'});
          }
          if(reservation.user.toString()!==user.id.toString()){
            return res.status(403).json({errors: 'Not your reservation'});
          }
          let timeBlockId = null;
          async.parallel([
            (callback)=>{
              TimeBlock.findOneAndUpdate({reservation: reservation.id}, {isAvailable: true, $unset: {reservation: ''}}, {new: true})
                .then(timeblock=>{
                    timeBlockId = timeblock.id;
                    callback(null, true);
                })
            },
            (callback)=>{
              Reservation.findByIdAndUpdate(reservation.id, {$set: {status: 'Cancelled'}}, {new: true})
                .then(reservation=>{
                  if(reservation){
                    callback(null, true);
                  }else{

                    callback(null, false);
                  }
                })
            }
          ],(err, results)=>{
            if(results.filter(el=>el).length!==2){
              return res.status(400).json({errors: 'Something went wrong'});
            }
            TimeBlock.findById(timeBlockId)
              .populate({path: 'subscriptions', populate: {path: 'user'}})
              .populate({path: 'day', populate: {path: 'park'}})
              .then(timeblock=>{
                const asyncEmails = timeblock.subscriptions.map(el=>{
                  return ()=>{
                    const emailText = `The Time Slot You are Subscribed to at ${timeblock.day.park.name} from ${moment(timeblock.startTime).tz('America/Los_Angeles').format('MM-DD-YYYY hh:mm A')} is now available`
                    const emailTitle = 'New Time Slot Available'
                    const toEmail= el.user.email;
                    sendEmail(emailText, toEmail, emailTitle, ()=>console.log('Some Message'));  
                  }
                })
                async.parallel(asyncEmails, ()=>{
                  TimeBlock.findByIdAndUpdate(timeBlockId, {$set: {subscriptions: []}})
                })
              });
            return res.json({
              success: true
            });
          });
        })
    })
})
// @route   PUT api/reservation/admin/cancel/:reservationId
// @desc    Cancel reservation on the admin side
// @access  Private(admin)
router.put('/admin/cancel/:reservationId', passport.authenticate('jwt', {session: false}), (req, res)=>{
  User.findById(req.user.id)
    .then(user=>{
      if(!user){
        return res.status(401).json({errors: 'User not found'});
      }
      if(!user.isAdmin){
        return res.status(403).json({errors: 'You do not have permission'});
      }
      Reservation.findById(req.params.reservationId)
        .then(reservation=>{
          if(!reservation){
            return res.status(404).json({errors: 'Reservation does not exists'});
          }
          async.parallel([
            (callback)=>{
              Reservation.findByIdAndUpdate(req.params.reservationId, {$set: {status:  'Cancelled'}}, {new: true})
                .then((reservation)=>{
                  if(reservation){
                    callback(null, true)
                  }else{
                    callback(null, false)
                  }
                });
            },
            (callback)=>{
              TimeBlock.findOneAndUpdate({reservation: reservation.id}, {$unset: {reservation: ''}}, {new: true})
                .then(timeblock=>{
                  callback(null, false);
                })
            }
          ], (err, results)=>{
            if(results.filter(el=>el).length !==2){
              return res.status(400).json({errors: 'Something went wrong'});
            }
            //notification to user
            //send below code in callback of email func
            return  res.json({success: true});
          })
          
        })
    })
});



//
// function roundMinutes(date) {
//
//     date.setHours(date.getHours());
//     date.setMinutes(0);
//     date.setSeconds(0);
//     date.setMilliseconds(0);
//
//
//     return date;
// }

//Job For Updating Non-CheckedIn bookings to Cancelled
let j = schedule.scheduleJob('15 * * * * ', function(){


    // let openTime =new Date();
let openTime = new Date();

//for 45 min-th query,add +1 to hour.
    openTime.setHours(openTime.getHours())



    // let roundTime= roundMinutes(openTime)

    console.log("Scheduler ran at :" +openTime )

    TimeBlock.find({
        startTime:
            {
                $lt:openTime
            },
            endTime:
                {
                   $gte: openTime
                },
        isAvailable:false

    }).then(retTimeBlocks=>{

        for ( let i = 0; i < retTimeBlocks.length; i++) {
           let  currentReservation = retTimeBlocks[i].reservation

            Reservation.findById(
                currentReservation
            ).then(retReservation=>{
                if(retReservation.status=="CheckIn")
                {

                }
                else
                {
                    // update status of Reservation
                    retReservation.status="Cancelled"
                    retReservation.save();
                    console.log("Cancelled Status of " +retReservation.id)

                    retTimeBlocks[i].isAvailable = true;
                    retTimeBlocks[i].reservation =undefined;
                    retTimeBlocks[i].save();
                    console.log("Performed Unset of" + retTimeBlocks[i].id)
                }

            })


        }

        })

});




module.exports = router;