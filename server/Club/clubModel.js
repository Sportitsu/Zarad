var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

//Club Table is here 
var clubSchema = new Schema ({
	username : {type : String, required : true, index : {unique : true} },
	password : {type : String, required : true },
	country  : {type : String, required : true },
	clubName : {type : String, required : true, index : { unique : true } },
});

clubSchema.pre('save', function (next) {
  var club = this;
  // only hash the password if it has been modified (or is new)
  if (!club.isModified('password')) {
    return next();
  }
// generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }
    // hash the password along with our new salt
    bcrypt.hash(club.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }
      // override the cleartext password with the hashed one
      club.password = hash;
      club.salt = salt;
      next();
    });
  });
});

var Club = mongoose.model('Club',clubSchema);

Club.comparePassword = function(candidatePassword, savedPassword, res, cb){
  bcrypt.compare( candidatePassword, savedPassword, function(err, isMatch){
    if(err){
      res.status(500).send('Error');
    } else if(cb){
      cb(isMatch);
    }
  });
};


var Club = mongoose.model('Club',clubSchema);

module.exports = Club;