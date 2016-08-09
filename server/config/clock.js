var CronJob = require('cron').CronJob;
var User = require('./../User/userModel');

module.exports = {
	job : new CronJob('00 00 00 * * *', function(){
		var threeDays = 259200000;
		var oneMonth  = 2592000000;
		User.find({}).exec(function(err, users){
				for(var i = 0 ; i < users.length; i++){
						var isFinished = users[i].subscription + ( oneMonth * users[i].membership);
						if(isFinished - Date.now() < threeDays && isFinished - Date.now() > -1){
							console.log('Should Subscribe');
							users[i].resub = true;
						} else if(isFinished - Date.now() > 0){
							console.log('Still Valid , Good To Go');
							users[i].valid = true;
						 } else {
						 	console.log('Sorry , better come again soon to run');
						 	users[i].valid = false;
							users[i].resub = true;
						 }
						 users[i].save();
				}
			});
	}, null, true, 'Asia/Amman')
}
