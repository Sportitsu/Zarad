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
<<<<<<< HEAD
=======
<<<<<<< HEAD
     if(user['type']==="club"){

      ObjUser["url"]='/api/club/signin'
    }
    return $http(ObjUser)
    .then(function (resp) {
<<<<<<< HEAD:client/app/services/services.js
      return resp.data;
    });
  }
=======
=======
>>>>>>> 9b966bbbf968c4d42b90468c898ede8fcf71797a
     if(user['type']==="admin"){
      ObjUser["url"]=''
    }
     if(user['type']==="club"){

      ObjUser["url"]=''
    }
    return $http(ObjUser)
    .then(function (resp) {
<<<<<<< HEAD
=======
>>>>>>> 3e0815cb5dff795cb2508fd447f0d9471d409d17
>>>>>>> 9b966bbbf968c4d42b90468c898ede8fcf71797a
      return resp;
    });
  };
  
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 5188d08d33f631bf868f85cb736047a544adcb7f:platforms/ios/www/app/services/services.js
=======
>>>>>>> 3e0815cb5dff795cb2508fd447f0d9471d409d17
>>>>>>> 9b966bbbf968c4d42b90468c898ede8fcf71797a
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
<<<<<<< HEAD
  var Addclub=function(club){
    console.log(club)
=======
<<<<<<< HEAD
  
  var Addclub=function(club){
     console.log(club)
=======
  var Addclub=function(club){
    console.log(club)
>>>>>>> 3e0815cb5dff795cb2508fd447f0d9471d409d17
>>>>>>> 9b966bbbf968c4d42b90468c898ede8fcf71797a
    return $http({
      method:'POST',
      data: club,
      url:'/api/clubregister'
    })
  };
   //send club information to tournament

  var Addtournament=function(tournament){
<<<<<<< HEAD
=======
<<<<<<< HEAD
    console.log(tournament)
=======
>>>>>>> 3e0815cb5dff795cb2508fd447f0d9471d409d17
>>>>>>> 9b966bbbf968c4d42b90468c898ede8fcf71797a
    return $http({
      method:'POST',
      data: tournament,
      url:''
    })
  };

<<<<<<< HEAD
  return {
    Addclub: Addclub,
    Addtournament:Addtournament
=======
<<<<<<< HEAD
var Adminsignin= function(admin){
 //console.log("dsads")
  return $http({
      method:'POST',
      data: admin,
      url:'/api/admin/signin'
    }).then(function (resp) {
      return resp.data;
    });
}

var Addadmin=function(newAdmin){
  //console.log(newAdmin)
  return $http({
  method:'POST',
  data: newAdmin,
  url:'/api/admin/create'
})
}
  return {
    Addclub: Addclub,
    Addtournament:Addtournament,
    Adminsignin:Adminsignin,
    Addadmin:Addadmin
=======
  return {
    Addclub: Addclub,
    Addtournament:Addtournament
>>>>>>> 3e0815cb5dff795cb2508fd447f0d9471d409d17
>>>>>>> 9b966bbbf968c4d42b90468c898ede8fcf71797a
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
