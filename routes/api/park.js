const router = require('express').Router();
const passport = require('passport');
const createParkValidation = require('../../validation/createPark');
const mongoose = require('mongoose');
const async = require('async');
const moment = require('moment-timezone');
const upload = require('../../config/multer');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
//import models
const Park = mongoose.model('parks');
const User = mongoose.model('users');
const Day = mongoose.model('days');
const TimeBlock = mongoose.model('timeblocks');

// @route   POST api/park/changImage/:id
// @desc    Add Image 
// @access  Private (Admin)
router.post('/changeImage/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

});
// @route   POST api/park/create
// @desc    Create a new park
// @access  Private (Admin)
router.post('/create', passport.authenticate('jwt', {session: false}), (req, res) => {

  User.findById(req.user.id)
    .then(user => {
      //check if user exists
      if(!user){
        return res.status(401).json({errors: 'User not found'})
      }
      //check if user is admin
      if (!user.isAdmin) {
        return res.status(403).json({
          error: 'You are not authorized for this request'
        });
      } 
      //Validate Fields
      const {
        errors,
        isValid
      } = createParkValidation(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      
      Park.findOne({
        name: req.body.name
      })
      .then((park) => {
        //check if park name is already used
        if (park) {
          errors.name = 'Park name already exists';
          return res.status(400).json(errors);
        } 
        const newPark = new Park({
          name: req.body.name,
          address: req.body.address,
          timeDays: req.body.days
        });
        newPark.save()
          .then((park) => {
            //generate array of 30 days also include park id
            const newDaysArray = [];
            for (let i = 0; i < 30; i++) {
              const momentObj = moment().tz('America/Los_Angeles').startOf('day').add(i, 'd');
              let dayOfWeek = moment().tz('America/Los_Angeles').startOf('day').add(i, 'd').isoWeekday();
              if(dayOfWeek===7){
                dayOfWeek=0;
              }
              const newDay = {
                date: momentObj.toDate(),
                openTime: moment().tz('America/Los_Angeles').startOf('day').add(i, 'd').add(park.timeDays[dayOfWeek].min, 'ms').toDate(),
                closeTime: moment().tz('America/Los_Angeles').startOf('day').add(i, 'd').add(park.timeDays[dayOfWeek].max, 'ms').toDate(),
                park: park.id
              }
              newDaysArray.push(newDay);
            }
            console.log(newDaysArray);
            Day.create(newDaysArray)
              .then(days => {
                const daysId = days.map(el => el.id);
                //update park and send new results back
                const timeblocksArrays = [];
                for(let day of days){
                  
                  let startTime = moment(day.openTime).tz('America/Los_Angeles').format('x');
                  let endTime = moment(day.closeTime).tz('America/Los_Angeles').format('x');
              
                  let endIteration = (parseInt(endTime)-parseInt(startTime))/3600000;
                  for(let i = 0; i< endIteration; i++){
                    const newTimeblock = {
                      startTime: moment(day.openTime).tz('America/Los_Angeles').add(i, 'h').toDate(),
                      endTime: moment(day.openTime).tz('America/Los_Angeles').add(i+1, 'h').toDate(),
                      day: day.id
                    }
                    timeblocksArrays.push(newTimeblock);
                  }
                }
                
                TimeBlock.create(timeblocksArrays)
                  .then(timeblocks=>{
                    //array of functions used to create timeblocks
                    let updateFunctions =[];
                    const arrayTimeBlocks = daysId.reduce((accumulator, currentValue, index, array)=>{
                      const newArray = timeblocks.filter(el=>  el.day.toString()===currentValue);
                      accumulator.push(newArray);
                      return accumulator;
                    }, []);
                    for(let arrayTimeBlock of arrayTimeBlocks){
                      updateFunctions.push((callback)=>{
                        const timeblockId = arrayTimeBlock.map(el=>el.id);                 
                        Day.findByIdAndUpdate(arrayTimeBlock[0].day.toString(), {$push: {timeblocks: {$each: timeblockId}}})
                          .then(day=>{
                            callback(null, 'done');
                          })
                      });
                    }
                    async.parallel(updateFunctions, (err, result)=>{
                      Park.findByIdAndUpdate(park.id, {
                        $push: {
                          days: {
                            $each: daysId
                          }
                        }
                      }, {
                        new: true
                      })
                      .populate('days')
                      .then(updatedPark => {
                        return res.json({
                          success: true,
                          park: updatedPark
                        });
                      })
                    })

                  })
                
                })

              });
          
        });
        
      
    });
});
// @route   PUT api/park/:id
// @desc    Modify Park
// @access  Private
router.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      if(user){
      if (!user.isAdmin) {
        return res.status(403).json({
          error: "You don't have permission"
        });
      } else {
        Park.findById(req.params.id)
          .then(park => {
            if (!park) {
              return res.status(404).json({
                error: 'Park not found'
              })
            } else {
              const {
                errors,
                isValid
              } = createParkValidation(req.body);
              if (!isValid) {
                return res.status(400).json(errors);
              } else {
                const newPark = {
                  name: req.body.name,
                  address: req.body.address,
                  timeDays: req.body.days
                }
                Park.findByIdAndUpdate(req.params.id, newPark, {
                    new: true
                  })
                  .then(park => {
                    return res.json(park)
                  });
              }
            }
          })
        }
      }else{
        return res.status(401).json({errors: 'User not recognized'});
      }
    })
});
// @route   GET api/park/all
// @desc    Get all park
// @access  Public
router.get('/all', (req, res) => {
  Park.find({})
    .then(parks => {
      return res.json({
        success: true,
        parks
      });
    });
});
// @route   GET api/park/:id
// @desc    Get all park
// @access  Public
router.get('/:id', (req, res) => {
  Park.findById(req.params.id)
    .populate({path: 'days', populate: {path:'timeblocks'}})
    .then(park => {
      if(park){
        return res.json({
          success: true,
          park
        });
      }else{
        return res.status(404).json({error: "Cannot find Park"});
      }
    })
    .catch(err=>{
      return res.status(404).json({error: "Cannot find Park"});
    })
});
// @route   GET api/park/:parkId/day/:dayId
// @desc    Get Day
// @access  Public
router.get('/:parkId/day/:dayId', (req, res)=>{
  Day.findById(req.params.dayId)
    .populate('timeblocks')
    .then(day=>{
      if(!day){
        return res.status(404).json({error: 'Not Found'});
      }
      if(day.park.toString()!==req.params.parkId){
        return res.status(404).json({error: 'Not Found'});
      }
      return res.json({
        success: true,
        day
      });
    
      
    })
    .catch(err=>res.status(404).json({error: 'Not Found'}));
});
// @route   POST api/park/:parkId/profile
// @desc    Change profile picture
// @access  Private
router.post('/:parkId/profile', passport.authenticate('jwt',{session: false}), (req, res)=>{
  upload(req, res, err=>{
    if (err) {
      console.log(err);
      return res.status(400).json({errors: err});
    } 
    User.findById(req.user.id)
      .then(user=>{
        if(!user){
          return res.status(401).json({errors: 'User not found'});
        }
        if(!user.isAdmin){
          return res.status(403).json({errors: 'Permission Denied'});
        }
        Park.findById(req.params.parkId)
          .then(park=>{
            if(!park){
              return res.status(404).json({errors: 'Park does not exists'});
            }
            cloudinary.v2.uploader.upload_stream({ resource_type: 'image' }, (error, result) => { 
              if(error){
                return res.status(400).json({errors: error})
              }
              Park.findByIdAndUpdate(park.id, {$set: {image: result.url}}, {new: true})
                .then(updatedPark=>{
                  return res.json({
                    success: true,
                    park: updatedPark
                  })
                })
                .catch(err=>{
                  return res.status(400).json({errors: err});
                })
            }).end(req.file.buffer);
          })
      })
    
  });
});
// @route   POST api/park/:parkId/profile
// @desc    Change profile picture
// @access  Private
router.post('/:parkId/photo', passport.authenticate('jwt', {session: false}), (req, res)=>{
  upload((req, res, err)=>{
    if (err) {
      console.log(err);
      return res.status(400).json({errors: err});
    } 
    User.findById(req.user.id)
      .then(user => {
        if(!user){
          return res.status(401).json({errors: 'User not found'});
        }
        if(!user.isAdmin){
          return res.status(403).json({errors: 'Permission Denied'});
        }
        Park.findById(req.params.parkId)
          .then(park=>{
            if(!park){
              return res.status(404).json({errors: 'Park does not exists'});
            }
            cloudinary.v2.uploader.upload_stream({ resource_type: 'image' }, (error, result) => { 
              if(error){
                return res.status(400).json({errors: error})
              }
              Park.findByIdAndUpdate(park.id, {$push: {photos: result.url}}, {new: true})
                .then(updatedPark=>{
                  return res.json({
                    success: true,
                    park: updatedPark
                  })
                })
                .catch(err=>{
                  return res.status(400).json({errors: err});
                })
            }).end(req.file.buffer);
          })
      })
  })
  
})
// @router  PUT api/park/admin/modify/park/:parkId/day/:dayId
// @desc    Modify day open hours for admin
// @access  Private (admin)
router.put('/admin/modify/park/:parkId/day/:dayId', passport.authenticate('jwt', {session: false}), (req, res)=>{
  User.findById(req.user.id)
    .then(user=>{
      if(!user){
        return res.status(401).json({errors: 'No user'})
      }
      if(!user.isAdmin){
        return res.status(403).json({errors: 'No permission'});
      }
      const adminEmail = user.email;
      Park.findById(req.params.parkId)
        .then(park=>{
          if(!park){
            return res.status(404).json({errors: 'Park not found'});
          }
          Day.findById(req.params.dayId)
            .populate('timeblocks')
            .then(day=>{
              if(!day){
                return res.status(404).json({errors: 'Day is not found'});
              }
              asyncFunc = [];
              if(day.timeblocks.length>0){
                const currentEarliestTimeStr = moment(day.timeblocks[0].startTime).tz('America/Los_Angeles').format('x');
                const nowEarliestTimeStr = moment(req.body.openTime).tz('America/Los_Angeles').format('x');
                const currentLatestTimeStr = moment(day.timeblocks[day.timeblocks.length-1].endTime).tz('America/Los_Angeles').format('x');
                const nowLatestTimeStr = moment(req.body.closeTime).tz('America/Los_Angeles').format('x');
                const earlyDiff = (parseInt(currentEarliestTimeStr)-parseInt(nowEarliestTimeStr))/3600000;
                const lateDiff = (parseInt(nowLatestTimeStr)-parseInt(currentLatestTimeStr))/3600000;
                console.log(earlyDiff);
                console.log(lateDiff);
                if(earlyDiff<0){
                  for(let i =0; i<Math.abs(earlyDiff); i++){
                    asyncFunc.push(
                      (callback)=>{
                        TimeBlock.findByIdAndRemove(day.timeblocks[i].id)
                          .populate('reservation')
                          .then(timeblock=>{
                            if(timeblock.reservation){
                              Reservation.findById(timeblock.reservation.id, {$set: {status: 'Cancelled'}}, {new: true})
                                .then(reservation=>{
                                  User.findById(reservation.user)
                                    .then(user=>{
                                      ////send email notification
                                      const userEmail = user.email
                                      // send request with parameters (adminEmail, userEmail, 'Reservation Cancelled')
                                      
                                      callback(null, true);
                                    })
                                  

                                })
                            }else{
                              callback(null, true);
                            }
                          })
                      }
                    )
                  }
                }else if(earlyDiff>0){
                  const TimeBlockArray = [];
                  for(let i = 0; i < earlyDiff; i++){
                    const startTime=moment(req.body.openTime).tz('America/Los_Angeles').add(i, 'h').toDate();
                    const endTime = moment(req.body.openTime).tz('America/Los_Angeles').add(i+1, 'h').toDate();
                    console.log(startTime, endTime);
                    TimeBlockArray.push({
                      startTime,
                      endTime,
                      day: day.id
                    });
                  }
                  asyncFunc.push(
                    (callback)=>{
                      TimeBlock.create(TimeBlockArray)
                        .then(timeblocks=>{
                          const timeBlocksIds = timeblocks.map(el=> el.id.toString());
                          Day.findByIdAndUpdate(day.id, {$push: {timeblocks:{$each: timeBlocksIds, $position: 0}}}, {new: true})
                            .then(day=>{timeBlocksIds
                              callback(null, true);
                            });
                        })
                    }
                  )
                }
                if(lateDiff<0){
                  for(let i= 0; i < Math.abs(lateDiff); i++){
                    asyncFunc.push(
                      (callback)=>{
                        TimeBlock.findByIdAndRemove(day.timeblocks[day.timeblocks.length-i-1].id)
                          .populate('reservation')
                          .then(timeblock=>{
                            if(timeblock.reservation){
                              Reservation.findById(timeblock.reservation.id, {$set: {status: 'Cancelled'}}, {new: true})
                                .then(reservation=>{
                                  User.findById(reservation.user)
                                    .then(user=>{
                                      ////send email notification
                                      const userEmail = user.email
                                      // send request with parameters (adminEmail, userEmail, 'Reservation Cancelled')
                                      
                                      callback(null, true);
                                    })
                                  

                                })
                            }else{
                              callback(null, true);
                            }
                          })
                      }
                    )
                  }
                }else if(lateDiff>0){
                  const TimeBlockArray = [];
                  for(let i = 0; i < lateDiff; i++){
                    const startTime=moment(day.timeblocks[day.timeblocks.length-1].endTime).tz('America/Los_Angeles').add(i, 'h').toDate();
                    const endTime = moment(day.timeblocks[day.timeblocks.length-1].endTime).tz('America/Los_Angeles').add(i+1, 'h').toDate();
                    console.log(startTime, endTime);
                    TimeBlockArray.push({
                      startTime,
                      endTime,
                      day: day.id
                    });
                  }
                  asyncFunc.push(
                    (callback)=>{
                      TimeBlock.create(TimeBlockArray)
                        .then(timeblocks=>{
                          const timeBlocksIds = timeblocks.map(el=> el.id.toString());
                          Day.findByIdAndUpdate(day.id, {$push: {timeblocks:{$each: timeBlocksIds}}}, {new: true})
                            .then(day=>{
                              console.log('setting true');
                              callback(null, true);
                            });
                        })
                    }
                  )
                }
                async.parallel(asyncFunc, (err, results)=>{
                  let valid = true;
                  console.log(results);
                  for(value of results){
                    valid = (value&&valid);
                  }
                  if(!valid){
                    return res.status(400).json({errors: 'Bad Request'});
                  }
                  return res.json({success: true});
                })
              }
            });
        })
    })
})


module.exports = router;