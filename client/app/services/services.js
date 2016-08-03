angular.module('zarad.services', [])
.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {

   return $http({
      method: 'POST',
      url: '',
      data: user
    })
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
});