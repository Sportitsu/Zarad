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
  var signin = function (user,url) {
    console.log("signin",user,url)
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

  var signin=function(admin){
    console.log(admin)
    return $http({
      method:'POST',
      url:'http://zarad.herokuapp.com/api/admin/signin',
      data:admin
    })
    .then(function(resp){
       return resp.data;
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
    Addclub: Addclub,
    getAdmins : getAdmins,
    deleteAdmin : deleteAdmin
  };
})

.factory('club',function($http){
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
  return{
    AddUser : AddUser
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
      url: 'http://zarad.herokuapp.com/api/tournament/tournaments'
      
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
      url: 'http://zarad.herokuapp.com/api/tournament/edit'
      
    }).then(function(resp){
      return resp.data;
    });
  };
  var DeleteTournament=function(Tournament){
    return $http({
      method:'POST',
      data:Tournament,
      url: 'http://zarad.herokuapp.com/api/tournament/delete'
      
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
