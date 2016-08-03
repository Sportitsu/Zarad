
angular.module('zarad.services', [])
.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    var ObjUser={
      method: 'POST',
      data: user
    }
    if(user[type]==="player"){
      ObjUser["url"]='/api/user/signin'
    }
     if(user[type]==="admin"){
      ObjUser["url"]=''
    }
     if(user[type]==="club"){
      ObjUser["url"]=''
    }
   return $http(ObjUser)
    .then(function (resp) {
      return resp.data.token;
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
  var Addclub=function(club){
    return $http({
      method:'POST',
      data: club,
      url:''

    })

  };
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

