var app = angular.module('zarad', [
	'ionic',
    'ionic-material',
    'zarad.user',
	'zarad.auth',
	'zarad.admin',
	'zarad.club',
	'zarad.tournament',
	'zarad.services',
    'ngRoute',
	'zarad.index',
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
        .state('adminaction',{
        	url:'/AdminAction',
        	templateUrl: 'js/templates/AdminAction.html',
        	controller: 'AdminController'
        })
        .state('AllTournament',{
            url:'/AllTournament',
            templateUrl:'js/templates/AllTournament.html',
            controller:'TournamentController'
            
        }) 
        .state('Edittournament',{
            url:'/Edittournament',
            templateUrl:'js/templates/Edittournament.html',
            controller:'TournamentController'
        })
        .state('userProfile',{
            url : '/userprofile',
            templateUrl : 'js/templates/User/userProfile.html',
            absract : true
        })
        .state('userProfile.home', {
          url: "/home",
          views: {
            'home-tab': {
              templateUrl: 'js/templates/User/profile-home.html',
              controller: 'UserProfileController'
            }
          }
        })
        
        // .state('clubprofile',{
        //     url:'/clubProfile',
        //     templateUrl: 'js/templates/club/clubProfile.html',
        //     controller: 'clubController'
        // })
        
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
    var flag = Auth.isAuth();
    
    if((next !== 'http://localhost:8100/#/AdminMain' || next !== 'http://zarad.herokuapp.com/#/AdminMain') && !Auth.isAuth()) {
     //   $state.go('/');
    };
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