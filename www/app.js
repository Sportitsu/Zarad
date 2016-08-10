var app = angular.module('zarad', [
	'ionic',
	'zarad.auth',
	'zarad.admin',
	'zarad.club',
	'zarad.index',
	'zarad.profile',
	'zarad.services',
	'ui.router'
	]);

app.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
   
   $httpProvider.defaults.headers.common = {};
   $httpProvider.defaults.headers.put = {};
   $httpProvider.defaults.headers.patch = {};

    $stateProvider
        .state('/', {
        	url: '/',
		    templateUrl: 'js/templates/home.html',
		    controller:'AuthController'
        })
        .state('signin', {
            url:'/signin',
            templateUrl : 'js/templates/signin.html',
            controller:'AuthController'
        })
        .state('adminmain',{
        	url:'/AdminMain',
        	templateUrl:'js/templates/AdminMain.html',
        	controller:'AdminController'
        })
        .state('adminsign',{
        	url:'/AdminSignin',
        	templateUrl:'js/templates/AdminSignin.html',
        	controller:'AdminController'
        })
        .state('adminsignup',{
        	url:'/AdminSignup',
        	templateUrl:'/js/templates/AdminSignup.html',
        	controller:'AdminController'
        })
        .state('adminaction',{
        	url:'/AdminAction',
        	templateUrl: 'js/templates/AdminAction.html',
        	controller: 'AdminController'
        })
        .state('addclub',{
        	url:'/AddClub',
        	templateUrl:'js/templates/AddClub.html',
        	controller:'AdminController'
        })
        .state('addtournment',{
        	url:'/AddTournment',
        	templateUrl:'js/templates/AddTournment.html',
        	controller:'AdminController'
        })
        .state('profile',{
        	url:'/clubprofile/:username',
        	templateUrl:'js/templates/clubprofile.html',
        	controller:'profileController'
        })
        .state('userProfile',{
            url : '/'
        })


        $urlRouterProvider.otherwise('/');
	
	// $httpProvider.interceptors.push('AttachTokens');
	$httpProvider.defaults.transformRequest = function(data) {        
	    if (data === undefined) { return data; } 
	    return $.param(data);
	};
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
})
.factory('AttachTokens',function ($window){
	var attach = {
		request: function(object){
			var jwt = $window.localStorage.getItem('com.zarad');
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
        // TODO when user is signed in and going to sign in
        // page then redirect to his profile or home page
	});
 // $ionicPlatform.ready(function() {
 //    if(window.cordova && window.cordova.plugins.Keyboard) {
 //      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
 //      // for form inputs)
 //      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

 //      // Don't remove this line unless you know what you are doing. It stops the viewport
 //      // from snapping when text inputs are focused. Ionic handles this internally for
 //      // a much nicer keyboard experience.
 //      cordova.plugins.Keyboard.disableScroll(true);
 //    }
 //    if(window.StatusBar) {
 //      StatusBar.styleDefault();
 //    }
 //  });
});