angular.module('zarad',[
	'zarad.services',
	'zarad.admin',
	'zarad.auth',
	'zarad.club',
	'zarad.profile',
	'ngRoute',
	'ionic'
])
.config(function ($routeProvider , $httpProvider) {


	$routeProvider
	.when('/',{
		templateUrl:'app/auth/home.html',
		controller: 'AuthController'
	})
	.when('/signin', {
		templateUrl :'app/auth/signin.html',
		controller : 'AuthController'
	})
	.when('/signup', {
		templateUrl :'app/auth/signup.html',
		controller : 'AuthController'
	})
	.when('/AdminMain',{
		templateUrl :'app/Admin/AdminMain.html',
		controller : 'AdminController'
	})
	.when('/AdminAction',{
		templateUrl: 'app/Admin/AdminAction.html',
		controller: 'AdminController'
	})
	.when('/AdminSignin',{
		templateUrl: '/app/Admin/AdminSignin.html',
		controller : 'AdminController'
	})
	.when('/AdminSignup',{
		templateUrl: '/app/Admin/AdminSignup.html',
		controller: 'AdminController'
	})
	.when('/AddClub',{
		templateUrl: '/app/Admin/AddClub.html',
		controller: 'AdminController'
	})
	.when('/AddTournment',{
		templateUrl: '/app/Admin/AddTournment.html',
		controller: 'AdminController'
	})
	.when('/clubprofile/:username',{
		templateUrl: 'app/profile/clubprofile.html',
		controller: 'profileController',
		
	})

	.when('/userprofile',{
		templateUrl: 'app/profile/userprofile.html',
		controller: 'profileController'

	})
	
	$httpProvider.interceptors.push('AttachTokens');
	$httpProvider.defaults.transformRequest = function(data) {        
	    if (data === undefined) { return data; } 
	    return $.param(data);
	};
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
})
.factory('AttachTokens',function ($window){
	var attach = {
		request: function(object){
			var jwt= $window.localStorage.getItem('com.zarad');
			if(jwt){
				object.headers['x-access-token']= jwt;
			}
			return object;
		}
	};
	return attach;
})
.run(function($rootScope, $location , Auth, $ionicPlatform){
	$rootScope.$on('$routeChangeStart',function(evt,next,current){
		if(next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
			$location.path('/signin');
		}
	});
	$ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});