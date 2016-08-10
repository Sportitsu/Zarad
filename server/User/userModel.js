'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

var userSchema = new Schema ({
	username : { type: String, required: true, index : {unique: true}},
	password : { type: String, required: true},
  country : { type : String , required : true },
  beltColor: { type: String , required: true},
  club: { type: String, required: true},
  membership : { type : Number, required : true , default : 1 },
  email: { type: String , index : {unique : true}},
  firstName: { type: String},
  lastName: { type: String },
  middleName : { type : String },
  age : { type : Number},
  phone: { type: String },
  Date: { type: Date, default: Date.now() },
  attendance : { type: Number },
  achievements: Schema.Types.Mixed,
  valid : { type : Boolean , default : true },
  subscription : { type : Number },
  resub : { type : Boolean , default : false},
  salt : { type : String}
});

userSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }
    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }
      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

var User = mongoose.model('User', userSchema);

User.comparePassword = function(candidatePassword, savedPassword, res, cb){
  bcrypt.compare( candidatePassword, savedPassword, function(err, isMatch){
    if(err){
      res.status(500).send('Wrong Password');
    } else if(cb){
      cb(isMatch);
    }
  });
};


module.exports = User;