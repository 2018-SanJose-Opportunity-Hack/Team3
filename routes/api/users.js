const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');
const registerValidation = require('../../validation/register.js');
const loginValidation = require('../../validation/login');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
// @route   POST api/users/register
// @desc    register a new user
// @access  Public
router.post('/register', (req, res) => {
  const {
    errors,
    isValid
  } = registerValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //check if username/email exists
  User.findOne({
      email: req.body.email
    })
    .then((user) => {
      //if email exists send error
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        User.findOne({
            username: req.body.username
          })
          .then((user) => {
            //if username exists send error
            if (user) {
              errors.username = 'Username already exists';
              return res.status(400).json(errors);
            } else {
              const newUser = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
              };
              //hash password with a salt
              bcrypt.genSalt(10, function (err, salt) {
                if (err) throw err;
                bcrypt.hash(newUser.password, salt, function (err, hash) {
                  if (err) throw err;
                  newUser.password = hash;
                  //create and save newUser to db
                  const newUserDbInstance = new User(newUser);
                  newUserDbInstance.save()
                    .then(user => {
                      const userData = user.toObject();
                      delete userData.password;
                      userData.id = user.id;
                      jwt.sign(userData, process.env.SECRETKEY, {
                        expiresIn: 36000
                      }, (err, token) => {
                        if (err) throw err;
                        return res.json({
                          success: true,
                          token: 'Bearer ' + token
                        });
                      });
                    })
                    .catch(err => console.log(err));
                });
              });
            }
          })
      }

    })
});
// @route   POST api/users/login
// @desc    login existing user
// @access  Public
router.post('/login', (req, res) => {
  //validate form
  const {
    errors,
    isValid
  } = loginValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //check if user exists
  User.findOne({
      username: req.body.username
    })
    .then(user => {
      if (!user) {
        errors.username = "Username does not exist";
        return res.status(400).json(errors);
      } else {
        //compare password with stored hash
        bcrypt.compare(req.body.password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              errors.password = "Password Incorrect";
              return res.status(400).json(errors);
            } else {
              const userData = user.toObject();
              delete userData.password;
              userData.id = user.id;
              //sign jwt token
              jwt.sign(userData, process.env.SECRETKEY, {
                expiresIn: 36000
              }, (err, token) => {
                if (err) throw err;
                return res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
            }
          });
      }
    });
});
// @route   GET api/users/current
// @desc    get current authenticated user
// @access  Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findById(req.user.id)
    .populate('reservations')
    .then(user=>{
      const userObj = user.toObject();
      delete userObj.password;
      userObj.id = user.id;
      return res.json({
        success: true,
        user: userObj
      });
    })
});
// @route   PUT api/users/approve/:userId
// @desc    approve user by id
// @access  Private (Admin)
router.put('/approve/:userId', passport.authenticate('jwt', {session: false}), (req, res)=>{
  User.findById(req.user.id)
    .then(user=>{
      if(!user){
        return res.status(401).json({errors: 'Not an existing user'});
      }
      if(!user.isAdmin){
        return res.status(403).json({errors: 'No permission'});
      }
      User.findById(req.params.userId)
        .then(user=>{
          if(!user){
            return res.status(401).json({errors: 'User does not exists'});
          }
          User.findByIdAndUpdate(req.params.userId, {$set: {isApproved: true}}, {new: true})
            .then(user=>{
              return res.json({
                success: true,
                user
              });
            });
        });
    });
});
// @route   GET api/users/
// @desc    approve user by id
// @access  Private (Admin)
router.get('/', passport.authenticate('jwt', {session: false}), (req, res)=>{
  User.findById(req.user.id)
    .then(user=>{
      if(!user){
        return res.status(401).json({errors: 'Not an existing user'});
      }
      if(!user.isAdmin){
        return res.status(403).json({errors: 'No permission'});
      }
      User.find({isAdmin: false})
        .then(users=>{
          return res.json({
            success: true,
            users
          });
        });
    });
});
module.exports = router;