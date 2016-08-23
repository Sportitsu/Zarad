angular.module('zarad.index',[])
.controller('parentController',function($scope, $ionicModal, $ionicPopup, $state, $timeout, $ionicActionSheet, $window, Auth, User, $location){

	$scope.user = {};
	$scope.data = {};
	$scope.checkColor = function(){
		if($scope.data.beltColor.toLowerCase() !== 'white'){
			$scope.initColor = 'white';
		} else {
			$scope.initColor = 'black';
		}
	}

	if(typeof $window.localStorage.member !== 'undefined'){
		$scope.data = JSON.parse($window.localStorage.member);
		$scope.checkColor();
	}
	
		// Gets the Date of Today to Use in Membership Action PopUp	
		var objToday = new Date(),
		  weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
		  dayOfWeek = weekday[objToday.getDay()],
		  domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
		  dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
		  months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
		  curMonth = months[objToday.getMonth()],
		  curYear = objToday.getFullYear(),
		  curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
		  curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
		  curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
		  curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
		var today = dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;

		$scope.showAction = function() {
		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
		 buttons: [
		   { text: '<span>Edit</span>' },
		   { text: '<span>Logout</span>'},
		   { text: '<span>Membership</span>'},
		   { text: '<span>Tournament</span>'}
		 ],
		 titleText: '<code>Action Menu</code>',
		 cancelText: '<b>Cancel</b>',
		 cancel: function() {
		    },
		 buttonClicked: function(index) {
		   if(index === 0 ){
			    // $scope.modal.show();
			    $scope.$emit('openEdit');
			    hideSheet();
		   } else if(index===1){
				$scope.logout();
				hideSheet();
		   } else if(index===2){
		   	    $scope.showDate();
		   	    hideSheet();
		   } else {
		   	$location.path('/AllTournament')
		   }
		 }
		});
		};

		
		$scope.showDate = function(){
				var willFinish = new Date($scope.data.subscription+((30*24*60*60*1000)*$scope.data.membership));
				willFinish+='';
				willFinish = willFinish.substr(0,16);
			var myPopup =  $ionicPopup.alert({
				title : '<b style="color:red">' +today + '</b>',
				template : 'Your membership ends in <b style="color:red">' + willFinish + '</b>'
			});
		};
		
		$scope.logout=function(){
			Auth.signout();
		};


		$scope.$on('openEdit', function(){
			$ionicModal.fromTemplateUrl('js/templates/User/profile-edit.html', {
				scope: $scope
			}).then(function(modal) {
				$scope.modal = modal;
				$scope.modal.show()
			});

		})

		 $scope.showPassWord = function(){
		  var myPopup = $ionicPopup.show({
		    template: '<label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="password" placeholder="Enter Old Password" ng-model="user.oldPassword"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="password" placeholder="Enter New Password" ng-model="user.password"></label><br>' ,
		              
		    title: '<p>Edit Personal Profile</p>',
		     scope: $scope,
		     buttons: [
		       { text: 'Cancel',
		       type: 'button button-outline icon icon-left ion-close-round button-dark bt',
		        },
		       {
		         text: '<b>Change</b>',
		         type: 'button button-outline icon icon-left ion-unlocked button-dark bt',
		         onTap: function(e) {
		          $scope.showConfirm();
		         }
		       },
		     ]
		   })
		 };
		  $scope.showConfirm = function() {
		   var confirmPopup = $ionicPopup.confirm({
		     title: 'You will change your Password',
		     template: 'Are you sure?'
		   });

		   confirmPopup.then(function(res) {
		     if(res) {
		     	$scope.confirm();
		     } else {
		       console.log('You are not sure');
		     }
		   });
		 };

		 $scope.confirm = function(){
		  $scope.user.username = $scope.data.username;
		 	User.editProfile($scope.user)
		 		.then(function(response){
		 			console.log(response);
		 			$scope.data = response.data;
					$state.go($state.current, {}, {reload: true});
				   $timeout(function() {
				      $scope.modal.hide();
				    }, 500);
		 		})
		 		.catch(function(error){
		 			console.log(error);
		 		})
		 }
})



