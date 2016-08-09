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

        $urlRouterProvider.otherwise('/');
	
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
.run(function($rootScope, $location , Auth){
	$rootScope.$on('$routeChangeStart',function(evt,next,current){
		if(next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
			$location.path('/signin');
		}
	});
});