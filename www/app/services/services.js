angular.module('zarad.services',[])

.factory('Auth',function($http){
	var signup=function(data){
		return $http({
			method: 'POST',
			url :'/api/user/signup',
			data: data
		})
		.then(function(resp){
			return resp.data;
		})
}
  var signin = function (user,url) {
    return $http({
      method:'POST',
      url: url,
      data:user
    })
    .then(function(resp,err){
      return resp;
    }) 
  };
  
 	var isAuth = function () {
    	return !!$window.localStorage.getItem('com.zarad');
  	};

	return{
		signup : signup,
		signin : signin,
		isAuth : isAuth
	}
})

.factory('Admin', function ($http, $location, $window) {
  var signin=function(admin){
    return $http({
      method:'POST',
      url:'/api/admin/signin',
      data:admin
    })
    .then(function(resp){
       return resp.data;
    });
  }

  var signup=function(admin){
    return $http({
      method:'POST',
      url:'/api/admin/create',
      data:admin
    })
    .then(function(resp){
      return resp.data;
    })
  }
  //send club information to server
  var Addclub=function(club){
    console.log(club)
    return $http({
      method:'POST',
      data: club,
      url:'/api/club/register'
    })
    .then(function(resp){
      return resp;
    })
  };
   //send club information to tournament
  var Addtournament=function(tournament){
    return $http({
      method:'POST',
      data: tournament,
      url:''
    })
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
    })
  }
  return{
    AddUser : AddUser
  }
})
