
angular.module('zarad',[
	'zarad.services',
	'zarad.admin',
	'zarad.auth',
	'ngRoute'
])
.config(function ($routeProvider , $httpProvider) {

	$routeProvider
	.when('/signin', {

		templateUrl :'app/auth/signin.html',
		controller : 'AuthController'
	})
	.when('/AdminHome',{
		templateUrl :'app/Admin/AdminHome.html',
		controller : 'AdminController'
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
		if(next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
			$location.path('/signin');
		}
	});
});