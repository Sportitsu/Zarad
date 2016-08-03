
angular.module('zarad.services', [])
.factory('Auth', function ($http, $location, $window) {
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
      return {token:resp.data.token,
        path:resp.data.path
      }
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.zarad');
  };

  return {
    signin: signin,
    isAuth:isAuth
    
  };
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
});

