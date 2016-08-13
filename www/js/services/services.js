'use strict';
angular.module('zarad.services',[])

.factory('Auth',function($http,$window,$location){
	var signup=function(data){
		return $http({
			method: 'POST',
			url :'http://zarad.herokuapp.com/api/user/signup',
			data: data
		})
		.then(function(resp){
			return resp.data;
		});
  };
  var signin = function (user) {
    return $http({
      method:'POST',
      url: "http://zarad.herokuapp.com/api/user/signin",
      data:user
    })
    .then(function(resp){
      return resp.data;
    }); 
  };
  
  var signout=function(){
    $window.localStorage.removeItem('com.user');
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

  var signup = function(admin){
    return $http({
      method:'POST',
      url:'http://zarad.herokuapp.com/api/admin/create',
      data:admin
    })
    .then(function(resp){
      return resp.data;
    })
  };

  //get all registered Admins
  var getAdmins = function () {
    return $http({
      method : 'GET',
      url : 'http://zarad.herokuapp.com/api/admin/admins'
    })
    .then(function (resp) {
      return resp.data;
    });
  };
  //remove selected admin
  var deleteAdmin = function (username) {
    return $http({
      method : 'POST',
      url : 'http://zarad.herokuapp.com/api/admin/delete',
      data : username
    })
    .then(function (resp) {
      return resp.data;
    })
  }
  return {
    signin: signin,
    signup: signup,
    getAdmins : getAdmins,
    deleteAdmin : deleteAdmin
  };
})
.factory('Club',function($http){
  var AddUser=function(user){
    return $http({
      method: 'POST',
      url : 'http://zarad.herokuapp.com/api/club/register',
      data:user
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var getClub=function(){
    // TODO
  };

    //send club information to server
  var Addclub=function(club){
    return $http({
      method:'POST',
      data: club,
      url:'http://zarad.herokuapp.com/api/club/register'
    })
    .then(function(resp){
      return resp.data;
    })
  };

  var removeClub = function (club) {
    return $http({
      method : 'POST',
      data : club,
      url : 'http://zarad.herokuapp.com/api/club/delete'
    })
    .then(function (resp) {
      return resp.data;
    })
  };
  
  return{
    AddUser : AddUser,
    getClub:getClub,
    Addclub : Addclub,
    removeClub : removeClub
  }
})
.factory('User', function($http){
  var getUser = function(name){
    return $http({
      method : 'GET' ,
      url : 'http://zarad.herokuapp.com/api/user/x/' + name
    }).success(function(response){
      return response.data;
    })
    .error(function(data){
      return response.data;
    });
  };

  var editProfile = function(user){
    return $http({
      method : 'POST' ,
      url : 'http://zarad.herokuapp.com/api/user/editProfile',
      data : user
    })
    .success(function(response){
      return response.data;
    })
    .error(function(data){
      return response.data;
    })
  }
 return {
   getUser : getUser,
   editProfile : editProfile
 }
})
.factory('Tournament',function($http){
  var AddTournament=function(tournament){
    return $http({
     method:'POST',
     url:'http://zarad.herokuapp.com/api/tournament/create',
     data:tournament
    })
    .then(function(resp){
       return resp;
    });
  }

  var getAllTournament=function(){
    return $http({
      method:'GET',
      url: '/api/tournament/tournaments'
      
    }).then(function(resp){
      return resp;
    })
  }
  var SearchAboutTournament=function(Tournament){
    return $http({
      method:'GET',
      url: 'http://zarad.herokuapp.com/api/tournament/x/'+Tournament
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var EditTournament=function(Tournament){
    return $http({
      method:'POST',
      data:Tournament,
      url: '/api/tournament/edit'
      
    }).then(function(resp){
      return resp.data;
    });
  };
  var DeleteTournament=function(Tournament){
    return $http({
      method:'POST',
      data:Tournament,
      url: '/api/tournament/delete'
      
    })
    .then(function(resp){
      return resp.data;
    });
  };
  return{
    AddTournament:AddTournament,
    getAllTournament:getAllTournament,
    SearchAboutTournament:SearchAboutTournament,
    EditTournament:EditTournament,
    DeleteTournament:DeleteTournament
  }
})
