const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');

//Configure the .env 
dotenv.config();
// DB config
const db = process.env.MONGO_URI;
//Connect to MONGODB
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err, 'there is an error'));
//load models
require('./models/index.js');
//Express setup
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
//passport jwt setup
require('./config/passport.js')(passport);

//import routes
const routes = require('./routes/api/index.js');
app.use("/api/users", routes.users);
app.use('/api/park', routes.park);
app.use('/api/reservation', routes.reservation);
app.listen(process.env.PORT || 5000, () => {
  console.log("Server listening on PORT 5000");
});