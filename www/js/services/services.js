'use strict';
angular.module('zarad.services',[])

.factory('Auth',function($http,$window,$location){
	var signup=function(data){
		return $http({
			method: 'POST',
			url :'/api/user/signup',
			data: data
		})
		.then(function(resp){
			return resp.data;
		});
  };
  var signin = function (user,url) {
    return $http({
      method:'POST',
      url: url,
      data:user
    })
    .then(function(resp){
      return resp.data;
    }); 
  };
  
  var signout=function(){
    $window.localStorage.removeItem('com.zarad');
    $location.path('/');
  }
 	var isAuth = function () {
    	return !!$window.localStorage.getItem('com.zarad');
  	};

	return{
		signup : signup,
		signin : signin,
		isAuth : isAuth,
    signout : signout
	};
})
.factory('Admin', function ($http) {


  var signin = function(admin){
    return $http({
      url: 'http://zarad.herokuapp.com/api/admin/signin',
      method: "POST",
      data:  admin
      }).success(function (data, status, headers, config) {
          console.log(data);
      }).error(function (data, status, headers, config) {
          console.log(data);
      });
  }

  var signup=function(admin){
    return $http({
      method:'POST',
      url:'http://zarad.herokuapp.com/api/admin/create',
      data:admin
    })
    .then(function(resp){
      return resp.data;
    })
  }
  //send club information to server
  var Addclub=function(club){
    return $http({
      method:'POST',
      data: club,
      url:'/api/club/register'
    })
    .then(function(resp){
      return resp.data;
    })
  };
   //send club information to tournament
  var Addtournament=function(tournament){
    return $http({
      method:'POST',
      data: tournament,
      url:'/api/tournament/create'
    }).then(function (resp) {
      return resp.data;
    });
  };
  return {
    signin: signin,
    signup: signup,
    Addclub: Addclub,
    Addtournament:Addtournament
  };
})

.factory('club',function($http){
  var AddUser=function(user){
    return $http({
      method: 'POST',
      url : '/api/club/register',
      data:user
    })
    .then(function(resp){
      return resp.data;
    });
  };
  return{
    AddUser : AddUser
  }
})
.factory('Profile', function ($http, $location, $window) {
  var getClub=function(){
    return $http({
      method: 'GET',
      url: '/api/club/x/:username'
    }).then(function(resp){
      return resp.data;
    })
  };
  return {
    getClub:getClub
  };
});

