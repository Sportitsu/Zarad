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
  var signin = function (user) {
    var ObjUser={
      method: 'POST',
      data: user
    }
    // this if statement to determain the type of user 
    if(user['type']==="player"){
      ObjUser["url"]='/api/user/signin'
    }
     if(user['type']==="admin"){
      ObjUser["url"]=''
    }
     if(user['type']==="club"){

      ObjUser["url"]=''
    }
    return $http(ObjUser)
    .then(function (resp) {
      return resp;
    });
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
  //send club information to server
  var Addclub=function(club){
    console.log(club)
    return $http({
      method:'POST',
      data: club,
      url:'/api/clubregister'
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
