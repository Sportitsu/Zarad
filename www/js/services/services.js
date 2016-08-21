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
    localStorage.clear();
    $window.localStorage.clear();
    $location.path('/');
  }
 	var isAuth = function () {
    	return !!$window.localStorage.getItem('com.zarad');
  };

  var checkUser=function(){
    if(!!$window.localStorage.getItem('admin')){
      return 'admin';
    }
      if(!!$window.localStorage.getItem('user')){
      return 'user';
    }
  }

	return{
		signup : signup,
		signin : signin,
		isAuth : isAuth,
    signout : signout,
    checkUser : checkUser
	};
})
.factory('Admin', function ($http, $window, $location) {

  var signin = function(admin){
    return $http({
      url: 'http://zarad.herokuapp.com/api/admin/signin',
      method: "POST",
      data:  admin
      })
    .then(function(resp){ 
      return resp.data;
    })
  }

  var signup = function(admin){
    return $http({
      method : 'POST',
      url:'http://zarad.herokuapp.com/api/admin/create',
      data:admin
    })
    .then(function(resp){
      return resp.data;
    })
  };

  var signout=function(){
    $window.localStorage.removeItem('admin');
    $window.localStorage.removeItem('com.zarad');
    $location.path('/');
  }
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
    signout: signout,
    getAdmins : getAdmins,
    deleteAdmin : deleteAdmin
  };
})
.factory('Club',function($http, $window, $location, $ionicHistory){
  var AddUser=function(user){
    return $http({
      method: 'POST',
      url : 'http://zarad.herokuapp.com/api/user/signup',
      data: user
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var getClub=function(username){
    return $http({
      method:'GET',
      url:"http://zarad.herokuapp.com/api/club/x/"+username
    })
    .then(function (resp) {
      return resp.data;
    })
  }


  var getClubForUser = function(data){
    return $http({
      method : 'POST' , 
      url : 'http://zarad.herokuapp.com/api/club/getclub', 
      data : data
    })
    .then(function (resp) {
      return resp;
    })
  } 

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

  // Get All Clubs
  var getClubs = function () {
    return $http({
      method : 'GET',
      url : 'http://zarad.herokuapp.com/api/clubs'
    })
    .then(function (resp) {
      return resp.data;
    })
  };

  var editClub=function(data){
    return $http({
      method:'POST',
      url:'http://zarad.herokuapp.com/api/club/editProfile',
      data:data
    })
    .then(function(resp){
      return resp.data;
    })
  };

  var getClubUsers=function(clubname){
    return $http({
      method:'GET',
      url:'http://zarad.herokuapp.com/api/users/clubUsers/'+clubname
    })
    .then(function(resp){
      return resp;
    })
  }
  
  var signout=function(){
    localStorage.clear();
    $window.localStorage.clear();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $location.path('/');
  }
  return{
    AddUser : AddUser,
    getClub:getClub,
    Addclub : Addclub,
    removeClub : removeClub,
    getClubs : getClubs,
    getClubForUser : getClubForUser,
    editClub: editClub,
    getClubUsers: getClubUsers,
    signout: signout
  }
})
.factory('User', function($http){
  var getUser = function(name){
    return $http({
      method : 'GET' ,
      url : 'http://zarad.herokuapp.com/api/user/x/' + name
    })
    .then(function (resp) {
      return resp.data
    });
  };

  var editProfile = function(user){
    return $http({
      method : 'POST' ,
      url : 'http://zarad.herokuapp.com/api/user/editProfile',
      data : user
    })
    .then(function(resp){
      return resp.data;
    });
  };
  var deleteUser = function(data){
    console.log(data)
    return $http({
      method : 'POST' , 
      url :'http://zarad.herokuapp.com/api/user/delete',
      data : data
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var getAllUsers=function(){
    return $http({
      method:'GET',
      url:'http://zarad.herokuapp.com/api/users'
    })
    .then(function(resp){
      return resp;
    })
  }

  var resub=function(username){
    return $http({
      method:'POST',
      url:'http://zarad.herokuapp.com/api/user/resub',
      data:username
    })
    .then(function(resp){
      return resp.data;
    })
  }

 return {
   getUser : getUser,
   editProfile : editProfile,
   resub: resub,
   deleteUser : deleteUser,
   getAllUsers : getAllUsers
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
      return resp.data;
    })
  }
  var SearchAboutTournament=function(Tournament){
    return $http({
      method:'GET',
      url: 'http://zarad.herokuapp.com/api/tournament/x/'+Tournament
    })
    .then(function(resp){
      return resp;
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

    var Like=function(TourLike){
    console.log(TourLike)
    return $http({
      method:'POST',
      data:TourLike,
      url: '/api/tournament/Like'
      
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var DisLike=function(TourLike){
    console.log(TourLike)
    return $http({
      method:'POST',
      data:TourLike,
      url: ''
      
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
    DeleteTournament:DeleteTournament,
    DisLike:DisLike,
    Like:Like
    
  }
})
