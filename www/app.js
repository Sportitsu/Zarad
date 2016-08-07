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
	.when('/clubprofile',{
		templateUrl: 'app/profile/clubprofile.html',
		controller: 'profileController'
	})

	.when('/userprofile',{
		templateUrl: 'app/profile/userprofile.html',
		controller: 'profileController'

	})
	
	$httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens',function ($window){
	var attach = {
		request: function(object){
			var jwt= $window.localStorage.getItem('com.zarad');
			if(jwt){
				object.headers['x-access-token']= jwt;
			}
			object.headers['Allow-Control-Allow-Origin']= '*';
			return object;
		}
	};
	return attach;
})
.run(function($rootScope, $location , Auth){
	$rootScope.$on('$routeChangeStart',function(evt,next,current){
		//if(next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
		//	$location.path('/signin');
		//}
	});
});