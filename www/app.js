var app = angular.module('zarad', [
	'ionic',
    'zarad.user',
	'zarad.auth',
	'zarad.admin',
	'zarad.club',
	'zarad.index',
	'zarad.profile',
	'zarad.services',
	'ui.router',
    'ngAnimate',
    'ngRoute'
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
        // .state('profile',{
        // 	url:'/clubprofile/:username',
        // 	templateUrl:'js/templates/clubprofile.html',
        // 	controller:'profileController'
        // })
        .state('userProfile',{
            url : '/userprofile/:user',
            templateUrl : 'js/templates/User/userProfile.html',
            controller : 'UserProfileController'
        .state('AdminRemove', {
            url : '/RemoveAdmin',
            templateUrl : 'js/templates/removeAdmin.html',
            controller : 'AdminController'
        })




        $urlRouterProvider.otherwise('/');
	
	// $httpProvider.interceptors.push('AttachTokens');
	$httpProvider.defaults.transformRequest = function(data) {        
	    if (data === undefined) { return data; } 
	    return $.param(data);
	};
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
})
.run(function($rootScope, $state, $location , Auth, $ionicPlatform){
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
  $rootScope.$on('$locationChangeStart', function (evt, next, current) {
    if(Auth.isAuth() && (next === 'http://localhost:8000/#/signin'|| next === 'http://zarad.herokuapp.com/#/AdminMain')){
        $state.go('/');
    }
    if(next === 'http://localhost:8000/#/AdminMain' || next === 'http://zarad.herokuapp.com/#/AdminMain'){
        $state.go('adminmain');
    } else if(!Auth.isAuth()) {
        $state.go('signin');
    }
  })

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
});