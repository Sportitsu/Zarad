var mongoose = require('mongoose');
var bluebird = require('bluebird');
var SALT_WORK_FACTOR = 10

var Schema = mongoose.Schema ;

// Admin table is here.
var adminSchema = new Schema ({
	username : {type: String, required : true, index : { unique : true }},
	password : {type: String, required : true},
	firstName : {type: String, required : true},
	lastName : {type: String, required : true},
	email : {type: String, required : true}
});

adminSchema.pre('save', function (next) {
  var admin = this;
  // only hash the password if it has been modified (or is new)
  if (!admin.isModified('password')) {
    return next();
  }
// generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }
    // hash the password along with our new salt
    bcrypt.hash(admin.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }
      // override the cleartext password with the hashed one
      admin.password = hash;
      admin.salt = salt;
      next();
    });
  });
});

var Admin = mongoose.model('Admin', adminSchema);

Admin.comparePassword = function(candidatePassword, savedPassword, res, cb){
  bcrypt.compare( candidatePassword, savedPassword, function(err, isMatch){
    if(err){
      res.status(500).send('Error');
    } else if(cb){
      cb(isMatch);
    }
  });
};

module.exports = Admin;